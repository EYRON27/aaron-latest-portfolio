const About = () => {
  const stats = [
    { number: '4+', label: 'Projects Built' },
    { number: '9', label: 'Certifications' },
    { number: '6+', label: 'Courses Taken' },
  ];

  return (
    <section id="about" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-amber-500"></div>
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              I build things for the web<span className="text-amber-500">.</span>
            </h2>
            <div className="flex gap-8 sm:gap-12">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-500">{stat.number}</div>
                  <div className="text-neutral-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <p>
              I'm a web development student who loves learning new technologies and building responsive,
              accessible, and efficient websites and applications. Currently pursuing a Bachelor of Science
              in Information Technology at Quezon City University.
            </p>
            <p>
              When I'm not busy coding or studying, I like trying out new tech, building side projects,
              and connecting with other students who share the same passion for development. I believe in
              creating digital experiences that matter and focusing on both functionality and aesthetics.
            </p>
            <p>
              I'm particularly passionate about front-end development and UI/UX design, always striving to
              create web experiences that are not only visually stunning but also fast and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
