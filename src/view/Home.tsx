import { Link } from '../components/Link';
import { GITHUB_PROFILE } from '../constants/profile';

export function Home() {
  return (
    <div>
      <h1>Howdy! Hi! 🤠</h1>
      <p>
      I am Josue, an experience software engineer with focus on Typescript, NodeJS, GCP, AWS, and React. I am passionate about learning and always curious to learn new things! I love challenges and always try to upskill by working on side projects that incorporate what I know and what I could learn. My <Link href={GITHUB_PROFILE}>GitHub</Link> is full of these side projects, check it out!
      </p>

      <h1>Front End</h1>
      <p>
        For Frontend I mainly like to use React and I also enjoy working with CSS. Some of my side projects using react have been inspired by art I see on around the web
        (<Link href="https://github.com/josue-rojas/timesince">Time Since</Link>).
        In my work experience I have used react but also had the opportunities to work with Vue and Angular.
      </p>

      <h1>Backend</h1>
      <p>
      For backend I like to use typescript and node. I love exploring other technologies too, like firebase, supabase, and other new stuff that comes up. Sometimes I have an idea that goes from planning to reality, tools like supabase has allowed me to create these ideas quickly and cheaply. In my work experience I have used other services such as GCP and AWS. Some cool things build was creating a data pipeline using pub/subs and cloud functions. 
      </p>
    
      <h1>Work Experience</h1>
      <p>
        I've previously worked at MikMak where I had the pleasure of learning about startups. I got to be a part of the growth phase, meeting new people and always trying to innovate to get ahead of the competition, it was very fun. I've learn so many things during my time there, I got to work as a lead in a few projects and also I picked up new tools like GCP pub/subs and AWS cloud formation for easy infrastructure management. 
      </p>
      <p>
      At Accenture I experience the fast pace of consulting. Working with many clients gave the chance to learn really quickly different technologies such as React, Angular, Typescript, Azure, MySQL, and many more.
      </p>

      <h1>Hobbies</h1>
      <p>
      👨‍💻I have many hobbies just cause I have an interest in learning as much as I can. I enjoy creating things like artsy websites, like this <Link href="https://www.withcheesepls.com/triangle-poster/">sleek triangle</Link>. I recently have been learning more about hardware and python with a raspberry pi to create <Link href="https://github.com/josue-rojas/live-locket">‘Live-Locket’</Link>.
      <br></br>
      ⛰️Oh I also like being outside. I’ve been on a total of 2 hikes, hoping to do more. I love to travel even if it’s just New York State, it’s bigger than I thought. I’ve gotten to explore some towns that have great people, great stories, and great stores for shopping. 
      <br></br>
      ✈️ Besides traveling, I also like diners. One of my first jobs was at a diner so it has a special place. My goal is to take a road trip while visiting the most diners I can. 
      <br></br>
      📸 I also picked up photography. I enjoy using film to get that nostalgic feel. I also shoot on a fuji camera for that continued nostalgia. (I secretly collect cameras…)
      </p>
  </div>)
}
