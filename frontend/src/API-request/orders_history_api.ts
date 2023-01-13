import {
    ResponseHistoryOrderDeleteType,
    ResponseHistoryOrderType,
    SearchOrderByPriceDataType,
} from "../Types/Types"
import { instance } from "./axios_instance"

export const orders_history_API = {

  getOrdersHistory(currentPage: number) {
    return instance.get<ResponseHistoryOrderType>(
        `orders/history?page=${currentPage}`,
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      ).then((res) => res.data)
  },

  getOrdersByPrice(searchOrderByPricedata: SearchOrderByPriceDataType,currentPage: number) {
    return instance.get<ResponseHistoryOrderType>(
        `orders/history/searchOrders/price?min=${searchOrderByPricedata.min}&max=${searchOrderByPricedata.max}&page=${currentPage}`,
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      ).then((res) => res.data)
  },

  getOrdersByDate(searchOrderByDateData: string, currentPage: number) {
    return instance.get<ResponseHistoryOrderType>(
        `orders/history/searchOrders/date?ordersDate=${searchOrderByDateData}&page=${currentPage}`,
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      ).then((res) => res.data)
  },

  removeOneOrder(id: string) {
    return instance.delete<ResponseHistoryOrderDeleteType>(`orders/history/${id}`, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      }).then((res) => res.data)
  },

  removeAllhistory() {
    return instance.delete<ResponseHistoryOrderDeleteType>(`orders/history`, {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      }).then((res) => res.data);
  },
}
