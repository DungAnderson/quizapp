import React from 'react'
import {Link} from "react-router-dom";
import '../styles/components/home.scss'
 const Home = () => {
    return (
       <div id="home">
           <section>
               <img alt="" className="image" src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.15752-9/351624635_782785703497312_7754850002797275713_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=eSx9_8L9jgIAX-ej8Iv&_nc_ht=scontent.fhan15-2.fna&oh=03_AdRui5uDbVxmwVgLyR7MsJ8qjaAwcvQas1mdcqYbEj35xQ&oe=64A3339C"/>
               <Link to = "/play">
                   <button className="btn">Start Quizz</button>
               </Link>
           </section>
       </div>
    )
 }

 export default Home;