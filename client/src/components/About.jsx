import React from "react";
import { Link } from "react-router-dom";
import st from './About.module.css';
import logoAxios from '../logos/logoAxios.png';
import logoCss from '../logos/logoCss.png';
import logoExpress from '../logos/logoExpress.jpg';
import logoJs from '../logos/logoJs.png';
import logoNodeJs from '../logos/logoNodeJs.jpg';
import logoPostgres from '../logos/logoPostgres.png';
import logoReact from '../logos/logoReact.png';
import logoReactRouterDom from '../logos/logoReactRouterDom.png';
import logoRedux from '../logos/logoRedux.jpg';
import logoSequelize from '../logos/logoSequelize.jpg';
import logoLi from '../logos/logoLi.png';
import logoGithub from '../logos/logoGithub.png';

export default function About(){
 return (
   <div className={st.all}>
     <Link to="/home">
       <button className={st.bu}>Go back home</button>
     </Link>

     <div className={st.text}>
        <p className={st.pa}>
        This platform is the result of my individual project at the Henry
        Dootcamp. Its functionality is to see, reed, search, filter and order
        different breeds of dogs in different pages. The data is consumed from an
        external API. It also gives the possibility of creating new races, as
        well as eliminating them.
        </p>
     </div>

     <hr/>

     <h1 className={st.tittle}>Technologies used for this application</h1>

     <div className={st.tech}>
       <div className={st.frontback}>
         <h5 className={st.tittle2}>Frontend:</h5>
         <div className={st.imag}>
            <img src={logoJs} alt="Not found" width="60" height="60" />
            <img src={logoReact} alt="Not found" width="60" height="60" />
            <img src={logoRedux} alt="Not found" width="60" height="60" />
            <img src={logoReactRouterDom} alt="Not found" width="60" height="60" />
            <img src={logoCss} alt="Not found" width="60" height="60" />
         </div>
         <p>JavaScript, React, Redux, React Router Dom v6, Css. </p>
       </div>

       <div className={st.frontback}>
         <h5 className={st.tittle2}>Backend and Database:</h5>
         <div className={st.imag}>
            <img src={logoNodeJs} alt="Not found" width="60" height="60" />
            <img src={logoExpress} alt="Not found" width="60" height="60" />
            <img src={logoSequelize} alt="Not found" width="60" height="60" />
            <img src={logoPostgres} alt="Not found" width="60" height="60" />
            <img src={logoAxios} alt="Not found" width="60" height="60" />
         </div>
         <p>Node JS, Express, Sequelize, Axios, PostgresSQL.</p>
       </div>
     </div>
     <hr/>
     <h1 className={st.tittle}>Contact me here!</h1>

     <div className={st.contact}>
       <div>
         
         <a href='https://www.linkedin.com/in/santiago-serena/'>
            <img className={st.GithubLi} src={logoLi} alt="Not found" width="115" height="115" />
         </a>
       </div>

       <div>
       <a href='https://github.com/santiserena'>
         <img src={logoGithub} alt="Not found" width="115" height="115" />
        </a> 
       </div>
     </div>
   </div>
 );   
}