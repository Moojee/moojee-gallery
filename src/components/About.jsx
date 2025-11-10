import React from "react";

/**
 * About Component - About the Artist (or the Hobbyist!)
 */
const About = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Thanks for stopping by my little art gallery on the web. I love painting and creating visual things — just for fun, not too seriously.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I didn’t design every piece here from scratch, but I found inspiration from beautiful artworks and visuals I’ve come across. 
          This website is a small space for me to learn and practice web design while exploring what I love about colors, shapes, and emotions.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Maybe one day, when I feel confident and skilled enough, I’ll create my very own original works.  
          Until then, I hope you enjoy wandering through this little space of mine.
        </p>
      </div>
    </section>
  );
};

export default About;
