import {FrontendComponents} from '../../components/index'

export default function Home() {
  return (
    <FrontendComponents.Layout.LandingLayout>
        <FrontendComponents.Sections.Hero/>
        <FrontendComponents.Sections.AboutUs/>
        <FrontendComponents.Sections.CallToAction tittle="¿Tienes alguna duda?" description={'Nuestro equipo de expertos altamente calificados está disponible para atenderle las 24 horas del día, los 7 día de la semana.'} buttonTitle="Contáctanos" link={`https://wa.me/${import.meta.env.VITE_TELEPHONE}?text=Hola,%20estoy%20interesado%20en%20sus%20servicios`}  />
        <FrontendComponents.Sections.Services/>
        <FrontendComponents.Sections.CallToAction tittle="¿Quieres saber sobre nosotros?" description={'Nuestro equipo de expertos altamente calificados está disponible para atenderle las 24 horas del día, los 7 día de la semana.'} buttonTitle="Cónocenos" link="#about"  />
        <FrontendComponents.Sections.SellTable/>
    
    
    </FrontendComponents.Layout.LandingLayout>
  )
}
