"use client";
import React, { useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const InputForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleParentDivClick = () => {
    inputRef.current?.focus();
  };

  const chatMutation = useMutation({
    mutationFn: async (text: string) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
        {
          'text': text,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("chats");
    },
  })

  return (
    <div className="w-full">
      <Formik
        initialValues={{ text: "" }}
        validate={(values) => {
          // TODO
        }}
        onSubmit={(values, { setSubmitting }) => {
          chatMutation.mutate(values.text);
          setSubmitting(false);
          values.text = "";
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              className="p-4 border rounded flex items-center max-h-[120px] w-full p-4"
              onClick={handleParentDivClick}
            >
              <input
                type="text"
                name="text"
                ref={inputRef}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                className="flex-grow p-2 focus:outline-none focus:border-none max-h-100 overflow-auto"
              />
              {errors.text && touched.text && (
                <span className="text-red-500">{errors.text}</span>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto p-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
