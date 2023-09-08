import { gql } from "@apollo/client";

//// get all versions of dsg
export const GET_CODE_GENERATOR_VERSIONS = gql`
  query versions($args: VersionFindManyArgs!) {
    versions(args: $args) {
      name
      changelog
      isDeprecated
    }
  }
`;

// get the current latest dsg version
export const GET_CODE_GENERATOR_VERSION = gql`
  query getCodeGeneratorVersion($args: GetCodeGeneratorVersionInput!) {
    getCodeGeneratorVersion(data: $args) {
      name
      changelog
      isDeprecated
    }
  }
`;

export const UPDATE_CODE_GENERATOR_VERSION = gql`
  mutation UpdateCodeGeneratorVersion(
    $data: CodeGeneratorVersionUpdateInput!
    $where: WhereUniqueInput!
  ) {
    updateCodeGeneratorVersion(data: $data, where: $where) {
      codeGeneratorStrategy
      codeGeneratorVersion
    }
  }
`;
