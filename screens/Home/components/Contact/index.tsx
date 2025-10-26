"use client";

import React, { useState } from "react";
import styles from "./Contact.module.scss";
import { Container } from "@/components/Container";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <Container
      id="contato"
      sectionClassName={styles.contact}
      containerClassName={styles.container}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          💬 Vamos Conversar?
        </h2>
        <p className={styles.subtitle}>
          Estou aqui para te ouvir e te ajudar! Me conte
          sobre seus sonhos, suas dificuldades e como posso
          te apoiar nessa jornada
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGroup}>
              <label
                htmlFor="name"
                className={styles.label}
              >
                💝 Como você gostaria de ser chamada?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                📧 Seu melhor e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label
                htmlFor="phone"
                className={styles.label}
              >
                📱 WhatsApp (opcional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label
                htmlFor="message"
                className={styles.label}
              >
                💭 Me conte sua história
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={5}
                placeholder="Me conte sobre seus sonhos, suas dificuldades, seus objetivos... Estou aqui para te ouvir com carinho! 💚"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              💝 Enviar com carinho
            </button>
          </form>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              💌 Vamos nos conectar?
            </h3>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <div className={styles.contactDetails}>
                <h4>Telefone</h4>
                <p>(31) 99999-9999</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <div className={styles.contactDetails}>
                <h4>E-mail</h4>
                <p>contato@***.com</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📍</div>
              <div className={styles.contactDetails}>
                <h4>Endereço</h4>
                <p>
                  Rua das Flores, 123
                  <br />
                  Belo Horizonte - MG
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🕒</div>
              <div className={styles.contactDetails}>
                <h4>Horário de Atendimento</h4>
                <p>
                  Segunda a Sexta: 8h às 18h
                  <br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>
          </div>

          <div className={styles.socialCard}>
            <h3 className={styles.socialTitle}>
              🌟 Me acompanhe nas redes
            </h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>
                  📘
                </span>
                Facebook
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>
                  📷
                </span>
                Instagram
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>
                  🐦
                </span>
                Twitter
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>
                  💼
                </span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
