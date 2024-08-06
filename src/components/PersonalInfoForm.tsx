import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  data: {
    phone?: string
    firstName?: string
    lastName?: string
    gender?: string
  }
  setData: React.Dispatch<React.SetStateAction<any>>
}

export const PersonalInfoForm: React.FC<Props> = ({ data, setData }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    phone: data.phone || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    gender: data.gender || '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.phone) newErrors.phone = 'Обязательное поле'
    if (!formData.firstName) newErrors.firstName = 'Обязательное поле'
    if (!formData.lastName) newErrors.lastName = 'Обязательное поле'
    if (!formData.gender) newErrors.gender = 'Обязательное поле'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setData((prevData: any) => ({ ...prevData, ...formData }))
      navigate('/address-work')
    }
  }

  return (
    <div className="container mt-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Телефон</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Имя</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className="text-danger">{errors.firstName}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Фамилия</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="text-danger">{errors.lastName}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Пол</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Выберите...</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Далее
        </button>
      </form>
    </div>
  )
}
