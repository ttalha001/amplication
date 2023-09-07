import * as models from "../../../models";
import { Icon, SelectField, Toggle } from "@amplication/ui/design-system";
import { useCallback } from "react";
import "./CodeGeneratorVersionStrategy.scss";

const CLASS_NAME = "code-generator-version-strategy";

type StrategyConfiguration = {
  strategy: models.CodeGeneratorVersionStrategy;
  title: string;
  description: string;
  selectTitle?: string;
  selectPlaceholder?: string;
  iconName?: string;
};

export const strategyConfiguration: StrategyConfiguration[] = [
  {
    strategy: models.CodeGeneratorVersionStrategy.LatestMajor,
    title: "Always use the latest version",
    description:
      "Automatically update to the latest version of the code generator. Current latest version: {getCurrentVersion}",
  },
  {
    strategy: models.CodeGeneratorVersionStrategy.LatestMinor,
    title: "Use the latest version within a specific major version",
    description:
      "Keep your code generator updated within a specific major version range.",
    selectTitle: "Select the major version to use",
    iconName: "lock",
  },
  {
    strategy: models.CodeGeneratorVersionStrategy.Specific,
    title: "Select a specific version",
    description:
      "Allows you to choose and stick to a specific version of the code generator.",
    selectTitle: "Select the specific version to use",
    iconName: "lock",
  },
];

export type Props = {
  savedStrategy: models.CodeGeneratorVersionStrategy;
  onStrategyChange: (strategy: models.CodeGeneratorVersionStrategy) => void;
  versionList?: string[];
  savedVersion?: string;
  onVersionSelect?: (version: string) => void;
};

export const CodeGeneratorVersionStrategy: React.FC<
  Props & StrategyConfiguration
> = ({
  strategy,
  title,
  description,
  iconName,
  selectTitle,
  selectPlaceholder,
  versionList,
  onStrategyChange,
  savedStrategy,
}) => {
  const onValueChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        return;
      }

      onStrategyChange(strategy);
    },
    [strategy]
  );
  return (
    <div className={`${CLASS_NAME}__container`}>
      <div className={`${CLASS_NAME}__top-section`}>
        <Toggle
          value={savedStrategy === strategy}
          onValueChange={onValueChange}
        />
        <div className={`${CLASS_NAME}__toggle-label`}>
          <div className={`${CLASS_NAME}__title`}>{title}</div>
          <div className={`${CLASS_NAME}__description`}>{description}</div>
        </div>
        <Icon className={`${CLASS_NAME}__icon`} icon={iconName} />
      </div>
      {versionList && versionList.length && (
        <div>
          <div>{selectTitle}</div>
          <SelectField
            label={selectTitle}
            name={selectPlaceholder}
            options={versionList.map((version) => ({
              label: version,
              value: version,
            }))}
          />
        </div>
      )}
    </div>
  );
};
