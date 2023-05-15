import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const useFetch = <T = unknown>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [isFatching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api.get(url, options)
    .then(response => {
      setData(response.data)
    })
    .catch(err => {
      setError(err)
    })
    .finally(() => {
      setIsFetching(false)
    })
  })

  return { data, error, isFatching }
}