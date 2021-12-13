import Intro from "../components/intro/Intro";
import Header from "../components/header/Header";
import Section from "../components/underIntro/Section";
import '../styles/style.css';


function RegisterPage() {

    return (
        <div className="App">
            <Header/>
            <Intro />
            <Section/>
        </div>
    );
}

export default RegisterPage;
