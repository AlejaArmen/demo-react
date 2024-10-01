"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function Component() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const benefits = [
    { title: "Productos Fritos sin Aceite", icon: "🍗" },
    { title: "Inversión Asequible", icon: "💰" },
    { title: "Soporte Continuo", icon: "🤝" },
    { title: "Menú Innovador", icon: "🍽️" }
  ]

  const testimonials = [
    { name: "Juan Pérez", text: "¡Las mejores alitas que he probado!" },
    { name: "María García", text: "Excelente oportunidad de negocio" },
    { name: "Carlos Rodríguez", text: "El soporte es increíble" }
  ]

  const franchiseSteps = [
    { title: "Contacto Inicial", icon: "📞" },
    { title: "Evaluación", icon: "📋" },
    { title: "Capacitación", icon: "🎓" },
    { title: "Apertura", icon: "🎉" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-orange-50 font-['Lobster',_cursive]">
      <header ref={parallaxRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-red-600">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/placeholder.svg"
            alt="Alitas saludables"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white z-10 text-center px-4"
        >
          ¡Únete a la Revolución de las Alitas Saludables!
        </motion.h1>
      </header>

      <section className="py-20 px-4 bg-orange-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <p className="text-lg mb-4 text-gray-800">{testimonials[currentTestimonial].text}</p>
            <p className="font-bold text-red-600">{testimonials[currentTestimonial].name}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-red-700">Proceso de Franquicia</h2>
          <div className="space-y-10">
            {franchiseSteps.map((step, index) => (
              <FranchiseStep key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-red-600 font-bold py-3 px-8 rounded-full text-xl hover:bg-orange-100 transition duration-300"
        >
          ¡Conviértete en Franquiciado Hoy!
        </motion.button>
      </section>

      <section className="py-20 px-4 bg-orange-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <ImageCard key={index} index={index} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Preguntas Frecuentes</h2>
          <FaqAccordion />
        </div>
      </section>

      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <BlogCard key={index} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

function BenefitCard({ title, icon, index }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        className="text-4xl mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-red-700">{title}</h3>
      <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </motion.div>
  )
}

function FranchiseStep({ title, icon, index }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center"
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={inView ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        className="bg-red-600 text-white text-2xl p-4 rounded-full mr-4"
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-xl font-semibold text-red-700">{title}</h3>
        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </motion.div>
  )
}

function ImageCard({ index }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="overflow-hidden rounded-lg shadow-md"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/placeholder.svg"
          alt="Imagen de alitas"
          width={400}
          height={300}
          layout="responsive"
        />
      </motion.div>
    </motion.div>
  )
}

function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    { question: "¿Cuánto cuesta la franquicia?", answer: "El costo varía según la ubicación y el tamaño del local." },
    { question: "¿Qué experiencia necesito?", answer: "No se requiere experiencia previa en restaurantes." },
    { question: "¿Cuánto tiempo toma abrir una franquicia?", answer: "El proceso generalmente toma de 3 a 6 meses." },
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{ backgroundColor: activeIndex === index ? "#fff5f5" : "#ffffff" }}
          className="border rounded-md overflow-hidden"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="font-medium text-red-700">{faq.question}</span>
            <motion.span
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-700"
            >
              ▼
            </motion.span>
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: activeIndex === index ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-4 text-gray-700">{faq.answer}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

function BlogCard({ index }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg overflow-hidden shadow-md"
    >
      <Image
        src="/placeholder.svg"
        alt="Blog post image"
        width={400}
        height={200}
        layout="responsive"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-red-700">Título del Blog Post</h3>
        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </motion.div>
  )
}