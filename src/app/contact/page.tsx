"use client";

import EmailLogo from "@/components/SVG-icons/email";
import LinkedinLogo from "@/components/SVG-icons/linkedin";
import GithubLogo from "@/components/SVG-icons/github";
//import TwitterLogo from '@/components/SVG-icons/twitter';

import styles from "./contact.module.scss";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { emailRegExp } from "@/utils/regular-expressions";

interface FormInputs {
  access_key: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [formIsPending, setFormIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setFormIsPending(true);
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(async (response) => {
        let json = await response.json();
        console.log(json);
        if (json.success) {
          setFormResponse({
            status: 201,
            message: "Form sent successfully!",
          });
          reset({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          setFormResponse({
            status: 500,
            message:
              "Something went wrong. Please, email me directly to joaquin.mmol@gmail.com",
          });
        }
        setFormIsPending(false);
      })
      .catch((error) => {
        setFormResponse({
          status: 500,
          message:
            "Client Error. Please check the console.log for more info or email me directly to joaquin.mmol@gmail.com",
        });
        console.log(error);
        setFormIsPending(false);
      });
  };

  return (
    <>
      <div className={styles.positionMainElements}>
        <main className={styles.Container}>
          <div className={styles.FormContainer}>
            <div className={styles.formInnerContainer}>
              <Form
                hasFieldset
                id="contact-form"
                legend="Contact form"
                onSubmit={handleSubmit(onSubmit)}
                usesItsOwnButtons
                backendResponse={formResponse}
                isPending={formIsPending}
                onReset={() => {
                  reset({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  });
                }}
              >
                <input
                  type="hidden"
                  value="fe6697fb-809f-4b14-9754-3b0e1293af59"
                  {...register("access_key")}
                />
                <Input
                  data-cy="contact-name-input"
                  aria-invalid={errors.name ? true : false}
                  watchedValue={watch("name")}
                  error={
                    errors.name &&
                    "Name needs to be between 3 and 50 characters."
                  }
                  formIsOpen
                  placeholder="Your name"
                  required
                  type="text"
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                  })}
                />
                <Input
                  data-cy="contact-email-input"
                  aria-invalid={errors.email ? true : false}
                  watchedValue={watch("email")}
                  error={
                    errors.email &&
                    "Invalid email. Accepted format: <username>@<domain>"
                  }
                  formIsOpen
                  placeholder="Your email"
                  required
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: emailRegExp,
                  })}
                />
                <Input
                  data-cy="contact-subject-input"
                  aria-invalid={errors.subject ? true : false}
                  watchedValue={watch("subject")}
                  error={
                    errors.subject &&
                    "Subject needs to be between 3 and 50 characters."
                  }
                  formIsOpen
                  placeholder="Message subject"
                  required
                  type="text"
                  {...register("subject", {
                    required: true,
                    minLength: 3,
                    maxLength: 50,
                  })}
                />
                <Input
                  data-cy="contact-message-input"
                  aria-invalid={errors.message ? true : false}
                  watchedValue={watch("message")}
                  error={
                    errors.message &&
                    "Your message needs to be between 10 and 250 characters."
                  }
                  formIsOpen
                  placeholder="Message"
                  required
                  type="textarea"
                  {...register("message", {
                    required: true,
                    minLength: 10,
                    maxLength: 250,
                  })}
                />
              </Form>
            </div>
          </div>
          <div className={styles.OtherContactMeansContainer}>
            <div className={styles.otherContactMeansInnerContainer}>
              <h2>Not a big fan of forms?</h2>
              <h3>You can also contact me over here:</h3>
              <ul>
                <li className={styles.contactListElement}>
                  <a
                    href="mailto:joaquin.mmol@gmail.com"
                    className={`${styles.EmailLogo} ${styles.contactLink}`}
                    target="_blank"
                  >
                    <EmailLogo EmailLogoStyles={styles.logo} />
                    Email
                  </a>
                </li>
                <li className={styles.contactListElement}>
                  <a
                    href="https://www.linkedin.com/in/joaquin-m2/"
                    className={`${styles.LinkedinLogo} ${styles.contactLink}`}
                    target="_blank"
                  >
                    <LinkedinLogo LinkedinLogoStyles={styles.logo} />
                    LinkedIn
                  </a>
                </li>
                <li className={styles.contactListElement}>
                  <a
                    href="https://github.com/Joaquin-M2"
                    className={`${styles.GithubLogo} ${styles.contactLink}`}
                    target="_blank"
                  >
                    <GithubLogo GithubLogoStyles={styles.logo} />
                    GitHub
                  </a>
                </li>
              </ul>
              <p className={styles.bottomParagraph}>
                If you prefer a direct call, feel free to send me an email so we
                can arrange a meeting.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
