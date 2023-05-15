export interface Fields {
  name: string;
  type: string;
  hasDefaultValue: boolean;
  isId: boolean;
  visible?: boolean;
  kind?: string;
  isList?: boolean;
  relationName?: string;
  relationFromFields?: Array<string>,
  relationToFields?: Array<string>,
  isReadOnly?: boolean;
}

export interface SchemaType {
  id: number;
  name: string;
  fields: Array<Fields>;
  visible: boolean;
}

export interface SettingsType {
  schema: Array<SchemaType>;
  sidebar: Array<SchemaType>;
  view: Array<SchemaType>;
  add: Array<SchemaType>;
  edit: Array<SchemaType>;
}

export interface ActionType {
  type: string;
  payload: SettingsType;
}

export interface Columns {
  name: string;
  fields: Array<Fields>;
}

export interface BreadCrumbList {
  id: number;
  name: string;
  url: string;
  isSelected?: boolean;
}

export interface MenuType {
  id: string;
  name: string;
  url: string;
  isVisible: boolean;
}

export interface FilterTableType {
  totalTable: number;
  filteredTable: number;
}

export interface TableDataVariableType {
  take: number;
  skip: number;
  orderBy: Record<string, string>;
  where?: Object;
}