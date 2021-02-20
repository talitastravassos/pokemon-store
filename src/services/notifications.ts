import Swal from "sweetalert2";
import { NotificationType } from "../types/notification.types";

export const modalNotification = (message: string, type: NotificationType) => {
  Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 3000,
  });
};
