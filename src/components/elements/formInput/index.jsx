/* eslint-disable react/prop-types */
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FloatLabel } from 'primereact/floatlabel'
import { Zustand } from '../../../libs'
import es from 'react-phone-input-2/lang/es.json'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { axios, cookieToken } from '../../../utils'
import { Toast } from 'primereact/toast'
import useFormInput from './useFormInput'
export function FormInput(props) {
  const { setUserData, userData, setToken } = Zustand.useStore()

  const { activeInput,
    setActiveInput,
    inputValue,
    setInputValue } = useFormInput(props)

  let object = {}

  if (props.id === 'email') {
    object.email = yup
      .string()
      .email('Debe ser un correo valido')
      .required('El correo es requerido')
  }

  if (props.id === 'phone') {
    object.phone = yup.string().required('El teléfono es requerido')
  }

  if (props.id === 'indentification') {
    object.indentification = yup
      .string()
      .required('La identificación es requerida')
  }

  if (props.id === 'password') {
    object.password = yup.string().required('La contraseña es requerida')
  }
  
  if (props.id === 'username') {
    object['username'] = yup.string().required('El texto es requerido')
  }

  const schema = yup.object(object)
  const toast = useRef(null)

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    data = { ...data, id: userData.id }
    // console.log(data);
    try {
      const response = await axios.createAxios().put(`user/update`, data)
      const responseData = response.data
      //console.log(responseData);
      if (responseData.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Se actualizo correctamente', life: 3000 })
        setUserData({ ...userData, [props.id]: inputValue })
        //  console.log(userData);
        setActiveInput(false)
        if (props.id === 'password') {
          cookieToken.removeCookieToken('userToken')
          cookieToken.setCookieToken({ cookieName: 'userToken', token: responseData.data.token })
          setToken(responseData.data.token)
        }
      }
    } catch (error) {
      toast.current.show({ severity: 'severity', summary: 'Éxito', detail: 'Se actualizo correctamente', life: 3000 })

    }
  }

  return (
    <div className='w-full'>
      {activeInput
        ? <form
          className='relative'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FloatLabel className='flex flex-col w-full gap-2'>
            <label htmlFor={props.id}>
              {props.label}
            </label>
            <div className='relative w-full pass-wrapper'>
              {
                props.id == 'phone' ? (
                  <Controller
                    control={control}
                    name={props.id}
                    render={({ field: { ref, ...field } }) => (
                      <PhoneInput
                        {...field}
                        inputExtraProps={{
                          ref,
                          required: true,
                          autoFocus: true
                        }}
                        onChange={setInputValue}
                        value={inputValue}
                        placeholder="Ej. +58000-000-0000"
                        localization={es}
                        country={'ve'}
                        className="m-0 w-full font-sans  border border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg hover:border-blue-500 focus:outline-none focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] p-3 text-base"

                        type="text"
                        id={props.id}
                      />

                    )}
                  />
                ) : (
                  <input
                    id={props.id}
                    {...register(props.id)}
                    className='m-0 w-full font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg hover:border focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] p-3 text-base'
                    value={inputValue}
                    type={props.type}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={props.placeholder}
                  />
                )
              }
              <div className='absolute top-0 right-0 flex p-3 button-container'>
                <button type='submit'>
                  <i className='text-green-500 text-md hover:text-green-600 bi bi-check' />
                </button>
                <button onClick={() => setActiveInput(false)}>
                  <i className='text-red-500 text-md hover:text-red-600 bi bi-x' />
                </button>
              </div>
            </div>
            {errors[props.id] &&
              <p className='text-red-500'>
                {errors[props.id].message}
              </p>}
          </FloatLabel>
        </form>
        : <FloatLabel className='relative flex flex-col w-full gap-2'>
          <label htmlFor={props.id}>
            {props.label}
          </label>
          <div className='relative w-full '>
            <input
              id={props.id}
              disabled={true}
              type={props.type}
              value={inputValue}
              className='w-full p-3 m-0 font-sans text-base text-gray-600 transition-colors duration-200 bg-white border border-gray-300 rounded-lg appearance-none dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40 hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-none dark:focus:shadow-none'
              placeholder={props.placeholder}
            />
            <button
              className='absolute right-0 p-3'
              onClick={() => setActiveInput(true)}
            >
              <i className='text-green-500 text-md hover:text-green-600 bi bi-pencil-square' />
            </button>
          </div>
        </FloatLabel>}
      <Toast ref={toast} />
    </div>
  )
}
