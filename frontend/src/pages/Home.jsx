import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProjects } from '../store/slices/projectSlice';
import { fetchSkills } from '../store/slices/skillSlice';
import { fetchCertificates } from '../store/slices/certificateSlice';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchCertificates());
    }, [dispatch]);

    return (
        <main>
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
        </main>
    );
};

export default Home;
