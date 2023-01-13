export type RegisterValuesType = {
  userName: string
  email: string
  password: string
}

export type LoginValuesType = {
  email: string
  password: string
}

export type UserDataType = {
  _id: string
  userName: string
  email: string
  userPhoto: string
}

export type UserDataEditorType = {
  userName: string
  userPhoto: File
}

export type FormValuesType = LoginValuesType & RegisterValuesType & UserDataEditorType

export type ProductType = {
  _id: string
  name: string
  price: number
  firstType: {
    id: string
    quantity: number
    size: number
    src: string
  }
  secondType: {
    id: string
    quantity: number
    size: number
    src: string
  }
  thirdType: {
    id: string
    quantity: number
    size: number
    src: string
  }
}

export type OrderType = {
  id: string
  name: string
  photo: string
  size: number
  price: number
  quantity: number
}

export enum CodeStatus {
  ok = 200,
  created = 201,
  notFound = 404,
  unAuthorized = 401,
  conflict = 409,
  serverError = 500,
}

export type ResponseRegisterDataType = {
  message: string
  success: boolean
  resultCode: CodeStatus
}

export type ResponseLoginDataType = {
  userData: UserDataType
  token: string
  resultCode: CodeStatus
}

export type ResponseProductsType = {
  products: ProductType[]
  totalCount: number
  resultCode: CodeStatus
}

export type ResponseMeType = {
  userData: UserDataType
  resultCode: CodeStatus
}

export type HistoryOrderType = {
  _id: string
  date: Date
  money: number
  orders: OrderType[]
  orderNumber: number
  user: string
}

export type ResponseHistoryOrderType = {
  orders: HistoryOrderType[];
  totalHistoryOrderCount: number
  ordersTotalPrice: number
  resultCode: CodeStatus
}

export type ResponseHistoryOrderDeleteType = {
  message: string
  resultCode: CodeStatus
}

export type ResponseOrdersType = {
  message: string
  resultCode: CodeStatus
}

export type SidebarDataType = {
  title: string
  path: string
  cName: string
};

export type SearchOrderByPriceDataType = {
  min: number
  max: number
}
