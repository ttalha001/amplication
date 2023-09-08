import { useCallback, useContext, useState } from "react";
import * as models from "../.././../models";
import "./CodeGeneratorVersionForm.scss";
import { AppContext } from "../../../context/appContext";
import { Form, Formik } from "formik";
import { validate } from "../../../util/formikValidateJsonSchema";
import { useTracking } from "../../../util/analytics";
import FormikAutoSave from "../../../util/formikAutoSave";
import {
  CodeGeneratorVersionStrategy,
  strategyConfiguration,
} from "./CodeGeneratorVersionStrategy";
import { useMutation } from "@apollo/client";
import { UPDATE_CODE_GENERATOR_VERSION } from "./queries";
import { AnalyticsEventNames } from "../../../util/analytics-events.types";

const CLASS_NAME = "code-generator-service-form";

type CodeGeneratorVersionOptions = {
  codeGeneratorVersion: string;
  codeGeneratorStrategy: models.CodeGeneratorVersionStrategy;
};

const CODE_GENERATOR_FORM_SCHEMA = {
  properties: {
    codeGeneratorVersion: {
      type: "string",
    },
    codeGeneratorStrategy: {
      type: models.CodeGeneratorVersionStrategy,
    },
  },
  required: ["codeGeneratorStrategy"],
};

function CodeGeneratorVersionForm() {
  const { currentResource } = useContext(AppContext);
  const [codeGeneratorVersionOptions, setCodeGeneratorVersionOptions] =
    useState<CodeGeneratorVersionOptions>({
      codeGeneratorVersion: null,
      codeGeneratorStrategy: models.CodeGeneratorVersionStrategy.LatestMajor,
    });
  const resourceId = currentResource?.id;

  const { trackEvent } = useTracking();

  const [updateCodeGeneratorVersion] = useMutation<{
    data: {
      codeGeneratorOptions: {
        codeGeneratorVersion: string;
        codeGeneratorStrategy: models.CodeGeneratorVersionStrategy;
      };
    };
    where: {
      id: string;
    };
  }>(UPDATE_CODE_GENERATOR_VERSION, {
    onCompleted: () => {
      trackEvent({
        eventName: AnalyticsEventNames.CodeGeneratorVersionUpdate,
        properties: {
          strategy: codeGeneratorVersionOptions.codeGeneratorStrategy,
          version: codeGeneratorVersionOptions.codeGeneratorVersion,
        },
      });
    },
  });

  const handleSubmit = useCallback((data) => {
    console.log("handleSubmit", data);
    updateCodeGeneratorVersion({
      variables: {
        data: {
          codeGeneratorVersionOptions: {
            codeGeneratorStrategy: data.codeGeneratorStrategy,
            codeGeneratorVersion: data.codeGeneratorVersion || null,
          },
        },
        where: {
          id: resourceId,
        },
      },
    });
  }, []);

  const handleStrategyChange = (
    strategy: models.CodeGeneratorVersionStrategy
  ) => {
    console.log("handleStrategyChange", strategy);
    updateCodeGeneratorVersion({
      variables: {
        data: {
          codeGeneratorVersionOptions: {
            codeGeneratorStrategy: strategy,
          },
        },
        where: {
          id: resourceId,
        },
      },
    });
  };

  const handleVersionSelect = (version: string) => {
    console.log("handleVersionSelect", version);
    updateCodeGeneratorVersion({
      variables: {
        data: {
          codeGeneratorVersionOptions: {
            codeGeneratorStrategy:
              codeGeneratorVersionOptions.codeGeneratorStrategy,
            codeGeneratorVersion: version,
          },
        },
        where: {
          id: resourceId,
        },
      },
    });
  };

  return (
    <div className={CLASS_NAME}>
      <Formik
        initialValues={{
          CodeGeneratorVersionStrategy:
            models.CodeGeneratorVersionStrategy.LatestMajor,
        }}
        validate={(
          values: Pick<
            models.Resource,
            "codeGeneratorStrategy" | "codeGeneratorVersion"
          >
        ) => {
          const errors = {};
          validate(values, CODE_GENERATOR_FORM_SCHEMA);
          if (
            values.codeGeneratorStrategy !==
              models.CodeGeneratorVersionStrategy.LatestMajor &&
            !values.codeGeneratorVersion
          ) {
            errors["codeGeneratorVersion"] = "Required";
          }
          return errors;
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <div className={`${CLASS_NAME}__header`}>
                <h3>Choose Code Generator Version Settings</h3>
                <h5>Select one of the version settings options:</h5>
              </div>
              {strategyConfiguration.map(
                ({
                  strategy,
                  title,
                  description,
                  selectTitle,
                  selectPlaceholder,
                  iconName,
                }) => (
                  <CodeGeneratorVersionStrategy
                    savedStrategy={strategy}
                    onStrategyChange={handleStrategyChange}
                    onVersionSelect={handleVersionSelect}
                    strategy={strategy}
                    title={title}
                    description={description}
                    selectTitle={selectTitle}
                    selectPlaceholder={selectPlaceholder}
                    iconName={iconName}
                  />
                )
              )}
              <FormikAutoSave debounceMS={200} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CodeGeneratorVersionForm;
