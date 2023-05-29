import {
  Entity,
  EnumDataType,
  EnumEntityPermissionType,
  EnumEntityAction,
} from "@amplication/code-gen-types";
import { USER_ENTITY_NAME } from "../server/user-entity/user-entity";

const CUSTOMER_ENTITY_ID = "b8d49afb-8c12-49fa-9d6e-eb64be0ddded";
const PROFILE_ENTITY_ID = "f36aa4e3-d275-41d0-843a-876ec66bc2f7";
const CUSTOMER_ORDERS_FIELD_ID = "a766a160-506c-4212-9e5e-8ecd1d530eb4";
const CUSTOMER_ORGANIZATION_FIELD_ID = "e4ea7c84-e998-482e-8bd2-34657a3ff23c";
const CUSTOMER_VIP_ORGANIZATION_FIELD_ID =
  "3e64e7d1-b1d2-4c5a-a546-b4f493dc4f57";
const ORGANIZATION_ID = "3426e3f7-c316-416e-b7a1-d2a1bce17a4";
const USER_ID = "aed41776-99ca-4674-b26d-0458fd440875";
const ORGANIZATION_USERS_FIELD_ID = "3c5f6e76-a124-4f9a-a944-c75f55495859";
const ORGANIZATION_CUSTOMERS_FIELD_ID = "8d84e22b-ced7-46d7-8ffb-78b74477553a";
const ORGANIZATION_VIP_CUSTOMERS_FIELD_ID =
  "e0c1e5c4-71ae-4584-9e8b-fd1ac8c3b577";

const ORDER_CUSTOMER_FIELD_ID = "77c79b5e-b298-44b2-9648-d417c92a282b";
const USER_ORGANIZATION_FIELD_ID = "ae21f2fb-9174-49de-9576-632d859a5dd1";

const USER_MANAGER_FIELD_ID = "9bb55fcc-1c3a-4b99-8bcf-6ea85d052c3d";
const USER_EMPLOYEES_FIELD_ID = "7bb3d5c1-f5b9-4fa4-8087-87f0c549d5f2";

const USER_PROFILE_FIELD_ID = "118e407b-30f7-48da-af9c-de1393548b4c";
const PROFILE_USER_FIELD_ID = "42d31012-6164-472a-92d0-a8f5dc0486d4";

const USER: Entity = {
  id: USER_ID,
  name: USER_ENTITY_NAME,
  displayName: "User",
  pluralDisplayName: "Users",
  pluralName: "users",
  customAttributes: `@@index([name, displayName]) @@unique([name(sort: Desc), displayName]) @@map("users")`,

  fields: [
    {
      id: "053e75d0-9f02-4182-8f61-46fbdbaa71bd",
      permanentId: "053e75d0-9f02-4182-8f61-46fbdbaa71b1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {
        idType: "CUID",
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "a4e0c058-5768-4481-9da9-e48c73ab224d",
      permanentId: "a4e0c058-5768-4481-9da9-e48c73ab2241",
      name: "name",
      displayName: "Name",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.SingleLineText,
      customAttributes: "@db.VarChar(200) @unique",
    },
    {
      id: "e3fa6ddd-ad36-48ce-8042-9c0aa576e5a9",
      permanentId: "e3fa6ddd-ad36-48ce-8042-9c0aa576e5a1",
      name: "bio",
      displayName: "Bio",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.MultiLineText,
    },
    {
      id: "8c5c4130-94b0-4ce4-a4cb-4e42bf7a9b37",
      permanentId: "8c5c4130-94b0-4ce4-a4cb-4e42bf7a9b31",
      name: "email",
      displayName: "Email",
      required: true,
      unique: false,
      searchable: false,
      dataType: EnumDataType.Email,
    },
    {
      id: "71ba3f5e-7324-4ace-af95-d4bcea8f8368",
      permanentId: "71ba3f5e-7324-4ace-af95-d4bcea8f8361",
      name: "age",
      displayName: "Age",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.WholeNumber,
    },
    {
      id: "b491038d-f588-45e3-b97f-9074f3ed8c83",
      permanentId: "b491038d-f588-45e3-b97f-9074f3ed8c81",
      name: "birthDate",
      displayName: "Birth Date",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.DateTime,
      properties: { dataOnly: false },
    },
    {
      id: "9fa9604e-f9ab-45fb-b8bd-557ae10eda8c",
      permanentId: "9fa9604e-f9ab-45fb-b8bd-557ae10eda81",
      name: "score",
      displayName: "Score",
      required: true,
      unique: false,
      searchable: false,
      dataType: EnumDataType.DecimalNumber,
    },
    //self referencing one-to-many (manager-employees)
    {
      id: "a7b32c49-e73d-4b6f-9efb-fcb77e60b303",
      permanentId: USER_MANAGER_FIELD_ID,
      name: "manager",
      displayName: "Manager",
      required: false,
      unique: false,
      searchable: true,
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: USER_ID,
        relatedFieldId: USER_EMPLOYEES_FIELD_ID,
        allowMultipleSelection: false,
      },
    },
    {
      id: "3787591a-333b-45c5-9e9d-362d9697bb38",
      permanentId: USER_EMPLOYEES_FIELD_ID,
      name: "employees",
      displayName: "Employees",
      required: false,
      unique: false,
      searchable: false,
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: USER_ID,
        relatedFieldId: USER_MANAGER_FIELD_ID,
        allowMultipleSelection: true,
      },
    },
    {
      id: "9fa9604e-f9ab-45fb-b8bd-557ae1011111",
      permanentId: USER_ORGANIZATION_FIELD_ID,
      name: "organizations",
      displayName: "Organizations",
      required: false,
      unique: false,
      searchable: true,
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION_ID,
        relatedFieldId: ORGANIZATION_USERS_FIELD_ID,
        allowMultipleSelection: true,
      },
    },
    {
      id: "1a34cc0e-91dd-4ef2-b8eb-df5a44154a21",
      permanentId: "1a34cc0e-91dd-4ef2-b8eb-df5a44154a22",
      name: "interests",
      displayName: "Interests",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.MultiSelectOptionSet,
      properties: {
        options: [
          { label: "Programming", value: "programming" },
          { label: "Design", value: "design" },
        ],
      },
    },
    {
      id: "daa757a6-4e15-4afc-a6e3-d4366d64367a",
      permanentId: "daa757a6-4e15-4afc-a6e3-d4366d643671",
      name: "priority",
      displayName: "Priority",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ],
      },
    },
    {
      id: "e88e745f-e4a0-414a-b43d-99d7728d1207",
      permanentId: "e88e745f-e4a0-414a-b43d-99d7728d1201",
      name: "isCurious",
      displayName: "Is Curious",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.Boolean,
    },
    {
      id: "e8b7aca3-e761-4d0c-9196-b983d63ae80d",
      permanentId: "e8b7aca3-e761-4d0c-9196-b983d63ae801",
      name: "location",
      displayName: "Location",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.GeographicLocation,
    },
    {
      id: "e8b7aca3-e761-4d0c-9196-b983d63ae755",
      permanentId: "e8b7aca3-e761-4d0c-9196-b983d63ae755",
      name: "extendedProperties",
      displayName: "Extended Properties",
      required: true,
      unique: false,
      searchable: true,
      dataType: EnumDataType.Json,
    },
    // check 1:1 relation
    {
      id: "b227bd7a-2fe5-47f8-8f3e-29a2c26111b7",
      permanentId: USER_PROFILE_FIELD_ID,
      name: "profile",
      displayName: "Profile",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: PROFILE_ENTITY_ID,
        relatedFieldId: PROFILE_USER_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const PROFILE: Entity = {
  id: PROFILE_ENTITY_ID,
  name: "Profile",
  displayName: "Profile",
  pluralDisplayName: "Profiles",
  pluralName: "profiles",
  fields: [
    {
      id: "fbf703ef-c844-4ccc-9e0b-519bb5865dd4",
      permanentId: "34306463-d040-40cf-8027-732256a2f09a",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {
        idType: "AUTO_INCREMENT",
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "9fb9d3a7-dbb9-446d-86c6-64288f155376",
      permanentId: "0f95129d-21bc-4356-b654-06bb6bc716d9",
      name: "createdIn",
      displayName: "Created In",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "9fb9d3a7-dbb9-446d-86c6-64288f155376",
      permanentId: "0f95129d-21bc-4356-b654-06bb6bc716d9",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.DateTime,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "6c373d03-3e01-4b49-9a24-abae9a019acb",
      permanentId: "540c2056-7b17-4d9f-b880-d151f3d09e36",
      name: "updatedIn",
      displayName: "Updated In",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "6c373d03-3e01-4b49-9a24-abae9a019acb",
      permanentId: "540c2056-7b17-4d9f-b880-d151f3d09e36",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.DateTime,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "73ae2f7e-be53-4ad1-9e0a-e67b4813f152",
      permanentId: "50068313-7da1-406a-a6d0-99600ef0291a",
      name: "email",
      displayName: "Email",
      dataType: EnumDataType.Email,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    // check 1:1 relation
    {
      id: "c98933ba-1fbb-46b3-9460-07328bc3b08b",
      permanentId: PROFILE_USER_FIELD_ID,
      name: "user",
      displayName: "User",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: USER_ID,
        relatedFieldId: USER_PROFILE_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const ORDER: Entity = {
  id: "dc63b5ef-e386-4a1c-b764-8926dd3066b8",
  name: "Order",
  displayName: "Order",
  pluralDisplayName: "Orders",
  pluralName: "Orders",
  fields: [
    {
      id: "77f9b90c-d304-4d2f-a4de-82d9d08ab291",
      permanentId: "77f9b90c-d304-4d2f-a4de-82d9d08ab292",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "67063f41-e123-4c19-9707-5df92df469a4",
      permanentId: "67063f41-e123-4c19-9707-5df92df469a1",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "b77e5adf-71ce-4b22-b37b-f8641e277032",
      permanentId: "b77e5adf-71ce-4b22-b37b-f8641e277031",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "77c79b5e-b298-44b2-9648-d417c92a282b",
      permanentId: ORDER_CUSTOMER_FIELD_ID,
      name: "customer",
      displayName: "Customer",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_ORDERS_FIELD_ID,
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "474eda0e-4ad1-4ab6-9cd5-bfde089a833c",
      permanentId: "474eda0e-4ad1-4ab6-9cd5-bfde089a8331",
      name: "status",
      displayName: "Status",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "In Progress",
            value: "inProgress",
          },
          {
            label: "Done",
            value: "done",
          },
        ],
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "8ee1d632-078e-4932-8fbd-1470df109821",
      permanentId: "8ee1d632-078e-4932-8fbd-1470df109822",
      name: "label",
      displayName: "Label",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Fragile",
            value: "fragile",
          },
        ],
      },
      required: false,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.Public,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.Public,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.Public,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.Public,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.Public,
    },
  ],
};

const ORGANIZATION: Entity = {
  id: ORGANIZATION_ID,
  name: "Organization",
  displayName: "Organization",
  pluralDisplayName: "Organizations",
  pluralName: "Organizations",
  fields: [
    {
      id: "afcc24cf-e302-46f7-9457-843a0ec7a9d5",
      permanentId: "afcc24cf-e302-46f7-9457-843a0ec7a9d1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "4c22d45e-997c-4c9a-8bb8-c7b69c273da1",
      permanentId: "4c22d45e-997c-4c9a-8bb8-c7b69c273da2",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "3f34a87a-f392-47bf-bfab-2eb23cdbffd4",
      permanentId: "3f34a87a-f392-47bf-bfab-2eb23cdbffd1",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "22c4a27a-6490-4fb8-b951-7f42ded681bc",
      permanentId: "22c4a27a-6490-4fb8-b951-7f42ded681b1",
      name: "name",
      displayName: "Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "22c4a27a-6490-4fb8-b951-7f42ded6a766",
      permanentId: ORGANIZATION_USERS_FIELD_ID,
      name: "users",
      displayName: "Users",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: USER.id,
        relatedFieldId: USER_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "22c4a27a-6490-4fb8-b951-7f42ded68b99",
      permanentId: ORGANIZATION_CUSTOMERS_FIELD_ID,
      name: "customers",
      displayName: "Customers",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      unique: false,
      searchable: true,
    },
    // Additional lookup field to the same entity
    {
      id: "22c4a27a-6490-4fb8-b951-7f42d77a7b99",
      permanentId: ORGANIZATION_VIP_CUSTOMERS_FIELD_ID,
      name: "vipCustomers",
      displayName: "VIP Customers",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: CUSTOMER_ENTITY_ID,
        relatedFieldId: CUSTOMER_VIP_ORGANIZATION_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: true,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const CUSTOMER: Entity = {
  id: CUSTOMER_ENTITY_ID,
  name: "Customer",
  displayName: "The Customer", //Test the behavior with spaces
  pluralDisplayName: "The Customers", //Test the behavior with spaces
  pluralName: "TheCustomer",
  fields: [
    {
      id: "492ba140-5dde-419a-a087-199ddb8b2dc0",
      permanentId: "492ba140-5dde-419a-a087-199ddb8b2dc1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {
        idType: "AUTO_INCREMENT",
      },
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "d4d95cff-e8f4-4bd4-b102-fd10c93d5dea",
      permanentId: "d4d95cff-e8f4-4bd4-b102-fd10c93d5de1",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "68435ba2-711c-4a86-aa8f-af3b693c4433",
      permanentId: "68435ba2-711c-4a86-aa8f-af3b693c4431",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "15ca8761-2b26-4893-9306-a6fd384efdce",
      permanentId: "15ca8761-2b26-4893-9306-a6fd384efdc1",
      name: "email",
      displayName: "Email",
      dataType: EnumDataType.Email,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "ad93150b-615a-4b95-837e-3b3ab4d378eb",
      permanentId: "ad93150b-615a-4b95-837e-3b3ab4d378e1",
      name: "firstName",
      displayName: "First Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "6a12fcaa-9e0f-4d4a-b2ce-67d7d896f438",
      permanentId: "6a12fcaa-9e0f-4d4a-b2ce-67d7d896f431",
      name: "lastName",
      displayName: "Last Name",
      dataType: EnumDataType.SingleLineText,
      properties: {},
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "9f1681d5-59ac-4d6a-9fe5-d90832cd32fe",
      permanentId: "9f1681d5-59ac-4d6a-9fe5-d90832cd32f1",
      name: "isVip",
      displayName: "VIP",
      dataType: EnumDataType.Boolean,
      properties: {},
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "02242b3d-7f0b-489b-ae83-b772975dea06",
      permanentId: "02242b3d-7f0b-489b-ae83-b772975dea01",
      name: "birthData",
      displayName: "Birth Data",
      dataType: EnumDataType.DateTime,
      properties: {
        timeZone: "localTime",
        dateOnly: true,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "fa359cdb-60b1-4a8c-a59b-d70a2370fbd6",
      permanentId: "fa359cdb-60b1-4a8c-a59b-d70a2370fbd1",
      name: "averageSale",
      displayName: "Average Sale (-1500.00 - 1500.00)",
      dataType: EnumDataType.DecimalNumber,
      properties: {
        minimumValue: 1500,
        maximumValue: -1500,
        precision: 2,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "88931847-cfff-4345-8faf-82a762160340",
      permanentId: "88931847-cfff-4345-8faf-82a762160341",
      name: "favoriteNumber",
      displayName: "Favorite Number (1 - 20)",
      dataType: EnumDataType.WholeNumber,
      properties: {
        minimumValue: 1,
        maximumValue: 20,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "75f4b8c8-a1e7-4b83-aef2-b3b0b0c5d0bc",
      permanentId: "75f4b8c8-a1e7-4b83-aef2-b3b0b0c5d0b1",
      name: "geoLocation",
      displayName: "Geographic Location",
      dataType: EnumDataType.GeographicLocation,
      properties: {},
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "ecd8dbca-3524-4e38-985e-cc72c28f0b99",
      permanentId: "ecd8dbca-3524-4e38-985e-cc72c28f0b91",
      name: "comments",
      displayName: "Comments (up to 500 characters)",
      dataType: EnumDataType.MultiLineText,
      properties: {
        maxLength: 500,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "e0d70a60-6a1c-47be-8687-2d07f3e93b0b",
      permanentId: "e0d70a60-6a1c-47be-8687-2d07f3e93b01",
      name: "favoriteColors",
      displayName: "Favorite Colors (multi-select)",
      dataType: EnumDataType.MultiSelectOptionSet,
      properties: {
        options: [
          {
            label: "Red",
            value: "red",
          },
          {
            label: "Green",
            value: "green",
          },
          {
            label: "Purple",
            value: "purple",
          },
          {
            label: "yellow",
            value: "yellow",
          },
        ],
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "b227bd7a-2fe5-47f8-8f3e-29a2c26104a8",
      permanentId: "b227bd7a-2fe5-47f8-8f3e-29a2c26104a1",
      name: "customerType",
      displayName: "Customer Type",
      dataType: EnumDataType.OptionSet,
      properties: {
        options: [
          {
            label: "Platinum",
            value: "platinum",
          },
          {
            label: "Gold",
            value: "gold",
          },
          {
            label: "Bronze",
            value: "bronze",
          },
          {
            label: "Regular",
            value: "regular",
          },
        ],
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "b227bd7a-2fe5-47f8-8f3e-29a2c26111b7",
      permanentId: CUSTOMER_ORGANIZATION_FIELD_ID,
      name: "organization",
      displayName: "Organization",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION.id,
        relatedFieldId: ORGANIZATION_CUSTOMERS_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "b227bd7a-2fe5-47f8-8f3e-29a2c26113a2",
      permanentId: CUSTOMER_VIP_ORGANIZATION_FIELD_ID,
      name: "vipOrganization",
      displayName: "VIP Organization",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORGANIZATION.id,
        relatedFieldId: ORGANIZATION_VIP_CUSTOMERS_FIELD_ID,
        allowMultipleSelection: false,
      },
      required: false,
      unique: false,
      searchable: true,
    },
    {
      id: "e0d70a60-6a1c-47be-8687-2d07f3e9399a",
      permanentId: CUSTOMER_ORDERS_FIELD_ID,
      name: "orders",
      displayName: "Orders",
      dataType: EnumDataType.Lookup,
      properties: {
        relatedEntityId: ORDER.id,
        relatedFieldId: ORDER_CUSTOMER_FIELD_ID,
        allowMultipleSelection: true,
      },
      required: false,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const EMPTY: Entity = {
  id: "0c5ad4df-0467-444a-a249-94c2465ae90d",
  name: "Empty",
  displayName: "Empty",
  pluralDisplayName: "Empties",
  pluralName: "Empties",
  fields: [
    {
      id: "d5e8346e-5382-41cb-bcf7-563678709bea",
      permanentId: "d5e8346e-5382-41cb-bcf7-563678709be1",
      name: "id",
      displayName: "Id",
      dataType: EnumDataType.Id,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "26273293-4cd3-4765-b316-07d68ca99d44",
      permanentId: "26273293-4cd3-4765-b316-07d68ca99d41",
      name: "createdAt",
      displayName: "Created At",
      dataType: EnumDataType.CreatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
    {
      id: "97c4cded-8b11-4907-8079-861b2d83125f",
      permanentId: "97c4cded-8b11-4907-8079-861b2d831251",
      name: "updatedAt",
      displayName: "Updated At",
      dataType: EnumDataType.UpdatedAt,
      properties: {},
      required: true,
      unique: false,
      searchable: true,
    },
  ],
  permissions: [
    {
      action: EnumEntityAction.Create,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Delete,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Search,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.Update,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
    {
      action: EnumEntityAction.View,
      permissionFields: [],
      permissionRoles: [],
      type: EnumEntityPermissionType.AllRoles,
    },
  ],
};

const entities: Entity[] = [
  USER,
  PROFILE,
  ORDER,
  ORGANIZATION,
  CUSTOMER,
  EMPTY,
];

export default entities;
