import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  data: {
    workPlace?: string
    address?: string
  }
  setData: React.Dispatch<React.SetStateAction<any>>
}

export const AddressWorkForm: React.FC<Props> = ({ data, setData }) => {
  const [workPlaces, setWorkPlaces] = useState<string[]>([])
  const [selectedWorkPlace, setSelectedWorkPlace] = useState(
    data.workPlace || ''
  )
  const [address, setAddress] = useState(data.address || '')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setWorkPlaces(
          data.map(
            (item: { name?: string; slug?: string }) => item.name || item.slug
          )
        )
      })
      .catch((error) => console.error('Error fetching work places:', error))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData((prevData: any) => ({
      ...prevData,
      workPlace: selectedWorkPlace,
      address,
    }))
    navigate('/loan-parameters')
  }

  return (
    <div className="container mt-4 mb-4">
      <h2>Адрес и работа</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="workPlace" className="form-label">
            Место работы
          </label>
          <select
            id="workPlace"
            className="form-select"
            value={selectedWorkPlace}
            onChange={(e) => setSelectedWorkPlace(e.target.value)}
            required
          >
            <option value="">Выберите место работы</option>
            {workPlaces.map((workPlace, index) => (
              <option key={index} value={workPlace}>
                {workPlace}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Адрес
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Назад
          </button>
          <button type="submit" className="btn btn-primary">
            Далее
          </button>
        </div>
      </form>
    </div>
  )
}
