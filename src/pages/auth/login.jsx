import { useRef } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Elements, FrontendComponents } from "../../components";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import './inputs.scss'
import { Zustand } from "../../libs";
import { axios, cookieToken } from "../../utils";
import { Toast } from "primereact/toast";
import { useLoadingStore } from "../../store/useLoadingStore";
import { ProgressSpinner } from 'primereact/progressspinner';

const schema = yup.object({
    email: yup.string().email('Debe ser un correo valido').required("El correo es requerido"),
    newpassword: yup.string().required("La contraseña es requerida"),
}).required();

export default function Login() {

    const { loading, setLoading } = useLoadingStore()

    const toast = useRef("toast");


    const { setAuthModal, setIsLogin, setUserData, setIsAdmin } = Zustand.useStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {

        setLoading(true)

        try {
            const response = await axios.createAxios().post('/user/login', data)

            console.log(response)

            const responseData = response.data
            console.log(responseData)

            if (response && response.status === 200) {
                const { data: { username, email, phone, indentification, role }, token } = responseData.data
                setUserData({ username, email, phone, indentification, role })
                setIsLogin(true)
                setIsAdmin(role)
                // console.log(responseData);
                cookieToken.setCookieToken({ cookieName: 'userToken', token })
                if (role === 'admin') {
                    cookieToken.setCookieToken({ cookieName: 'adminToken', token: 'true' })
                }
                setAuthModal({ open: true, content: <Elements.Greetings title={`Bienvenido ${username}`} text={'Presione el botón abajo para entrar a su cuenta'} />, title: "Acceso exitoso", setOpen: () => { setAuthModal({ open: false }) }, footer: <Elements.FooterModal /> })
            }

        } catch (err) {
            const detail = err.response?.data.data.error ? err.response.data.data.error : "Error en la peticion"
            toast.current.show({ severity: 'error', summary: 'Error', detail })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <Helmet>
                <title>PFServicios | Iniciar sesión</title>
            </Helmet>
            <FrontendComponents.Layout.AuthLayout bgBackground="/logon-bg.jpg">
                <Elements.CardComponent title={<h1 className="text-center">Iniciar sesión</h1>} subtitle="" >
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container flex flex-col gap-4">
                            <div className="w-full pb-3">
                                <FloatLabel className="flex flex-col w-full gap-2">
                                    <label htmlFor="email">Correo</label>
                                    <InputText id="email" {...register("email")} placeholder="Ej. juan@pfservicios" />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </FloatLabel>
                            </div>
                            <div className="w-full pb-3">
                                <FloatLabel className="flex flex-col w-full gap-2 pass">
                                    <label htmlFor="newpassword">Contraseña</label>
                                    <Elements.PasswordInput register={register} placeholder="Contraseña" indicator="newpassword" />

                                    {errors.newpassword && <p className="text-red-500">{errors.newpassword.message}</p>}
                                </FloatLabel>
                            </div>
                        </div>
                        <button className="w-full py-3 text-center text-white duration-300 rounded-md bg-secondary hover:bg-primary">
                            {loading ?
                                <div className="text-center">
                                    <ProgressSpinner aria-label="Loading" style={{ width: '30px', height: '30px' }} strokeWidth="5" />
                                </div>
                                : "Iniciar sesión"}

                        </button>
                    </form>
                    <Divider />
                    <Elements.LostPassword />
                </Elements.CardComponent>

            </FrontendComponents.Layout.AuthLayout>
        </>
    )
}