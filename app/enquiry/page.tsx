import Footer from '../sections/Footer'
import Navbar from '../sections/Navbar'
import ProjectInterestSection from '../sections/ProjectIntrestSection'

const page = () => {
  return (<>
    <Navbar onlyLogo={true} />
  
    <section className=" bg-white dark:bg-black text-black dark:text-white min-h-dvh pt-10">
      <ProjectInterestSection project={"FOLDSHIELD++"}/>
      <Footer />
    </section>
  </>
  )
}

export default page