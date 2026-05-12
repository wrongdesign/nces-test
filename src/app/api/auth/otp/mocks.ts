import {type User, UserStatusesEnum} from "@/entities/user";

export const otp: string[] = ["000000", "111111", "222222", "333333", "444444"];

export const user: User = {
    user: {
       id: "admin_1",
        first_name: "Nazyuta",
        last_name: "Artyom",
        email: "resthave375@gmail.com",
        phone: "+375298394649",
        status: UserStatusesEnum.ACTIVE,
    },
    access_token: "123078162739057412903849012839548123"
}