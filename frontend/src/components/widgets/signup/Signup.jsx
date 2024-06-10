// import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store";
import Text from "../../basic/Text";
import Button from "../../basic/Button";

// import ErrorMessage from "../../../basic/ErrorMessage";
import { useForm } from "react-hook-form";
import { ButtonTypes, LinkTypes, MIN_USERNAME_LENGTH, REGEX_PATTERNS } from "../../../constants";
import ErrorMessage from "../../basic/ErrorMessage";
import Input from "../../basic/Input";
import Link from "../../basic/Link";
// import {
//   ButtonTypes,
//   LinkTypes,
//   MIN_USERNAME_LENGTH,
//   REGEX_PATTERNS,
//   SignupFormFields,
// } from "../../../../constants";
// import Input from "../../../basic/Input";
// import { useAppSelector } from "../../../../store";
// import Button from "../../../basic/Button";
// import Link from "../../../basic/Link";

const Signup = (props) => {
  const {
    apiError = "",
    isLoading = false,
    loginClickHandler,
    signupClickHandler,
    isSignedUp = false,
  } = props;
  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (isSignedUp) {
    return (
      <div
        className={`flex flex-col p-4 lg:p-0 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <Text className="capitalize text-2xl tracking-wider font-poppinsMedium self-center lg:self-auto">
          {t("signup")}
        </Text>
        <Text className="capitalize mt-6 self-center lg:self-auto">
          {t("signupSuccessful")}
        </Text>
        <div dir={isRTL ? "rtl" : "ltr"} className="self-center lg:self-auto">
          <Button
            className="capitalize w-fit px-4 py-2 mt-12"
            buttonType={ButtonTypes.primaryButton}
            onClickHandler={loginClickHandler}
          >
            <Text>{t("proceedToLogin")}</Text>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form
      className="flex flex-col p-4"
      onSubmit={handleSubmit(signupClickHandler)}
    >
      <Text className="capitalize text-2xl tracking-wider font-poppinsMedium self-center lg:self-auto">
        {t("signup")}
      </Text>
      <Text className="capitalize mt-6 self-center lg:self-auto">
        {t("enterYourDetailsBelow")}
      </Text>
      {apiError && (
        <ErrorMessage
          className="text-sm mt-1"
          errorIconClassName="w-4 h-4"
          message={apiError}
        />
      )}
      <Input
        placeholder={t("email")}
        type="text"
        className="mt-12 placeholder:capitalize"
        autoComplete="username"
        errorMessage={errors.email?.message || ""}
        {...register("email", {
          required: t("emailIsRequired"),
          validate: {
            matchPattern: (value) =>
              REGEX_PATTERNS.emailPattern.test(value) ||
              t("invalidEmailAddress"),
          },
        })}
      />

      <Input
        placeholder={t("username")}
        type="text"
        className="mt-10 placeholder:capitalize"
        autoComplete="username"
        errorMessage={errors.username?.message || ""}
        {...register("username", {
          required: t("usernameIsRequired"),
          validate: {
            matchPattern: (value) =>
              REGEX_PATTERNS.usernamePattern.test(value) ||
              "Username must be at least 3 characters long, all lowercase, and can contain numbers and underscores only",
          },
        })}
      />

      <Input
        placeholder={t("password")}
        type="password"
        className="mt-10 placeholder:capitalize"
        autoComplete="current-password"
        errorMessage={errors.password?.message || ""}
        {...register("password", { required: t("passwordIsRequired") })}
      />

      <Input
        placeholder={t("confirmPassword")}
        type="password"
        className="mt-10 placeholder:capitalize"
        autoComplete="current-password"
        errorMessage={errors.confirmPassword?.message || ""}
        {...register("confirmPassword", {
          required: t("passwordIsRequired"),
          validate: (confirmPasswordValue) => {
            if (watch("password") !== confirmPasswordValue) {
              return t("passwordsDontMatch");
            }
          },
        })}
      />

      <div
        className={`flex justify-between items-center mt-10 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <Button
          className="px-4 py-2 capitalize text-white"
          type="submit"
          buttonType={ButtonTypes.primaryButton}
          onClickHandler={() => {}}
          isLoading={isLoading}
        >
          <span>{t("signup")}</span>
        </Button>
      </div>

      <Link
        text={t("alreadyHaveAnAccountLogin")}
        linkType={LinkTypes.red}
        onClick={loginClickHandler}
        className="capitalize mt-4"
      />
    </form>
  );
};

export default Signup;