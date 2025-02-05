import { useForm } from "react-hook-form";
import { Input, Button, Label, Textarea } from "@/components/ui";
import { clientProductAPI } from "@/services/client/product";
import { useState } from "react";

function CheckoutForm({ getCart }) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitError("");

      await clientProductAPI.createOrder({
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address,
        },
        message: data.message,
      });
      reset();
      getCart();
    } catch (error) {
      console.error("送出訂單失敗:", error);
      setSubmitError(error.message || "送出訂單失敗，請稍後再試");
    }
  };

  return (
    <div className="mx-auto w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">收件人姓名</Label>
          <Input
            id="name"
            type="text"
            placeholder="請輸入姓名"
            {...register("name", {
              required: "請輸入收件人姓名",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="請輸入 Email"
            {...register("email", {
              required: "請輸入 Email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email 格式不正確",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tel">收件人電話</Label>
          <Input
            id="tel"
            type="tel"
            placeholder="請輸入電話"
            {...register("tel", {
              required: "請輸入收件人電話",
              minLength: {
                value: 8,
                message: "電話號碼至少需要 8 碼",
              },
              pattern: {
                value: /^\d+$/,
                message: "電話號碼格式不正確，僅限數字",
              },
            })}
          />
          {errors.tel && (
            <p className="text-sm text-red-500">{errors.tel.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address">收件人地址</Label>
          <Input
            id="address"
            type="text"
            placeholder="請輸入地址"
            {...register("address", {
              required: "請輸入收件人地址",
            })}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">留言</Label>
          <Textarea
            id="message"
            placeholder="請輸入留言"
            rows="3"
            {...register("message")}
          />
        </div>

        <div className="text-end">
          <Button type="submit">送出訂單</Button>
        </div>
      </form>
      {submitError && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-500">{submitError}</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
