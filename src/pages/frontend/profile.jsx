import { Elements, FrontendComponents } from '../../components';
import { Zustand } from '../../libs';
import { FormInput } from '../../components/elements/formInput';
import { Helmet } from 'react-helmet';
export default function Profile() {
    const zustand = Zustand.useStore()
    return zustand.userData && (
        <>
            <Helmet >
                <title>PFServicios | Perfil {zustand.userData.username}</title>
            </Helmet>
            <FrontendComponents.Layout.AuthLayout bgBackground="https://picsum.photos/1920/1080">
                <Elements.CardComponent title="Perfil" subtitle="Aquí puedes ver y modificar tus datos personales">
                    <div className="container flex flex-col gap-4 md:flex-row">
                        <div className="w-full pb-3 md:w-6/12">
                            <FormInput type="text" id="username" placeholder="Ej. Juan Perez" label="Nombre de usuario" />
                        </div>
                        <div className="w-full pb-3 md:w-6/12">
                            <FormInput type="phone" id="phone" placeholder="Ej. +58000-000-0000" label="Teléfono de contacto" />
                        </div>
                    </div>
                    <div className="container flex flex-col gap-4 md:flex-row">
                        <div className="w-full pb-3 md:w-6/12">
                            <FormInput type="text" id="indentification" placeholder="Ej. 0000000000" label="Identificación" />
                        </div>
                        <div className="w-full pb-3 md:w-6/12">
                            <FormInput type="password" id="password" placeholder="Contraseña" label="Contraseña" />
                        </div>
                    </div>
                    <div className="container flex flex-col gap-4 md:flex-row"></div>
                </Elements.CardComponent>
            </FrontendComponents.Layout.AuthLayout>
        </>
    )
}