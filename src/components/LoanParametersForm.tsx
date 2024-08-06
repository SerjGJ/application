import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  data: {
    amount?: number
    duration?: number
    firstName?: string
    lastName?: string
  }
  setData: React.Dispatch<React.SetStateAction<any>>
}

interface FormData {
  amount: number
  duration: number
}

interface Errors {
  amount?: string
  duration?: string
}

export const LoanParametersForm: React.FC<Props> = ({ data, setData }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    amount: data.amount || 200,
    duration: data.duration || 10,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: Number(value) }))
  }

  const validate = () => {
    const newErrors: Errors = {}
    if (!formData.amount) newErrors.amount = 'Обязательное поле'
    if (!formData.duration) newErrors.duration = 'Обязательное поле'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      axios
        .post('https://dummyjson.com/products/add', {
          title: `${data.firstName} ${data.lastName}`,
        })
        .then((response) => {
          setShowModal(true)
        })
        .catch((error) =>
          console.error('Error submitting loan request:', error)
        )
    }
  }

  const handleClose = () => {
    setShowModal(false)
    navigate('/')
  }

  return (
    <div className="container mt-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Сумма займа ($)</label>
          <input
            type="range"
            name="amount"
            className="form-range"
            min="200"
            max="1000"
            step="100"
            value={formData.amount}
            onChange={handleChange}
          />
          <div>{formData.amount}</div>
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Срок займа (дни)</label>
          <input
            type="range"
            name="duration"
            className="form-range"
            min="10"
            max="30"
            step="1"
            value={formData.duration}
            onChange={handleChange}
          />
          <div>{formData.duration}</div>
          {errors.duration && (
            <div className="text-danger">{errors.duration}</div>
          )}
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/address-work')}
          >
            Назад
          </button>
          <button type="submit" className="btn btn-primary">
            Подать заявку
          </button>
        </div>
      </form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заявка одобрена</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Поздравляем, {data.lastName} {data.firstName}. Вам одобрена{' '}
          {formData.amount}$ на {formData.duration} дней.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
