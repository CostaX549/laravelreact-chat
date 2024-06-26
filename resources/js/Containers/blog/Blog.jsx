import React from 'react'
import { Article } from '@/Components'



const Blog = () => {
  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">A lot is happening, We are blogging about it.</h1>
      </div>
      <div className="gpt3__blog-container">
         <div className="gpt3__blog-container_groupA">
          <Article imgUrl="/assets/blog01.png" date="Sep 26, 2021"  title="GPT-3 and Open  AI is the future. Let us explore how it is?" />
         </div>
         <div className="gpt3__blog-container_groupB">
           <Article imgUrl="/assets/blog02.png" date="Sep 26, 2021" title="GPT-3 and Open  AI is the future. Let us explore how it is?" />
           <Article imgUrl="/assets/blog03.png" date="Sep 26, 2021" title="GPT-3 and Open  AI is the future. Let us explore how it is?" />
           <Article imgUrl="/assets/blog04.png"  date="Sep 26, 2021" title="GPT-3 and Open  AI is the future. Let us explore how it is?"/>
           <Article imgUrl="/assets/blog05.png" date="Sep 26, 2021" title="GPT-3 and Open  AI is the future. Let us explore how it is?" />
         </div> 
      </div>
    </div>
  )
}

export default Blog