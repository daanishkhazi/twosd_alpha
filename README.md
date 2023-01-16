# Laera Post Mortem

Laera is a GPT-based tutor built by Daanish Khazi (github.com/daanishkhazi) and Shiv Subrahmanian (github.com/s-sub). It launched about a week before ChatGPT was released so it was a fairly short lived project but we wanted to share a few notes here on what we learned building Laera. 

## Motivation

We started working on Leara in September 2022. We started with the davinci-text-002 base model to power all the responses and were getting fairly good call & response style performance. GPT-3 is best at answering qualitative, knowledge based questions as pretty much most of the world's general knowledge is hidden somewhere in its many billion parameters. As such, we decided to focus on the high school market and subjects such as History and Biology. HS level subjects are well represented on the internet (GPT's training corpus) and HS students have dense social graphs which lend themselves to a reduced customer acquisition cost by way of organic growth. 

When we started, there was no standard GPT chat interface and most commercial applications were GPT-based writing tools (Copy.ai, Jasper, etc.). We wanted to build not only a chat interface but the highly specific interface optimized to simulate one-on-one learning. Educational psychology research [suggests](https://en.m.wikipedia.org/wiki/Bloom%27s_2_sigma_problem) that personal tutoring improves student outcomes more than any other teaching style - by as much as 2 standard deviations above the control! So we built an interface that closely guides the style of questions and topics that a student would ask from her tutor.

## Technology

We wanted to build fast without compromising security or scalability. We relied on OpenAPI for the base model, starting with text-davinci-002 and moving to text-davinci-003 which is improved with RLHF (Reinforcement Learning from Human Feedback), the same secret sauce that makes ChatGPT so good at understanding prompts. We kept a running memory window of 3 messages with well formed example prompts to give continuity to the questions. This was stored as a state variable in React (Next). The backend was entirely built with Next serverless APIs and deployed on Vercel. Postgres database with Prisma. Next-Auth for in house authentication. Tailwind for styling. Stripe for payments (made $10 from ourselves lfg). Feel free to peruse the repo and ping us with any questions. We're not experts but learned a lot about how to build generative AI applications from this process. 

## Design

We knew going in that building a moat for what is essentialy a "GPT Skin" is extremely challenging. The base model was built by a 3rd party (OpenAI) so the only two things that offer a competitive advantage are: (1) a proprietary data moat that can be used for fine tuning the model to specific use cases and (2) a compelling brand. We weren't so sure about (1), since larger and larger models tend to outperform any fine tuning and the increase in cost basis is unlikely to justify any incremental performance gains. So, we went all in on building a compelling brand.

To that end, we spent a lot of time on Figma (probably just as much as we did in VSCode). Neurotically cycled through color schemes, fonts, logos and vibes. In the end we landed on a sort of Neu Brutalist take on classroom learning. Pretty proud of the end result :) - feel free to poke around the site to see it - would be better than anything we could write here.

## Takeaways

We spent a few months building Laera, and the moment we finished, ChatGPT came out with what is probably one of the best web products of all time. Ultimately, it would have been better to hit market sooner rather than trying to perfect every little edge case before doing so. Some key learnings:
- Ship as fast as possible
- Design for mobile first, then adjust for breakpoints on larger screens
- High fidelity user feedback is the most valuable thing (just watch somebody use the product)
- Don't waste time implementing stripe until you know you're going to get paid customers (goes for any other feature)
- Prisma generate everytime you pull or make a new schema
- Probably use something like Auth0 for an mvp
