const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

(async () => {
  const questionsAndAnswers = [
    {
      questions: [
        "What is a trip fee?",
        "How is a trip fee charged?",
        "Can you explain how trip fees work?",
        "I want to know more about trip fees.",
        "How do trip fees relate to multiple bookings?",
        "Can you provide an overview of the trip fee system?",
        "How is the trip fee reflected on the invoice?",
        "What is included in a trip fee?",
        "How is the trip fee determined?",
        "Can you tell me more about the trip fee system?"
      ],
      answer:
        "A trip fee is a single fee charged per itinerary and can include multiple bookings associated with a trip, such as a hotel, flight, rental car, or train. The trip fee is reflected on the invoice of the initial booking. For more information, please visit <a href='https://community.tripactions.com/s/article/trip-fee-overview-for-travelers'>this page</a>.",
    },
    {
      questions:  [
        "What does a trip fee provide?",
        "What benefits are included in a trip fee?",
        "Can you list the services and support provided through a trip fee?",
        "How does a trip fee enhance the travel experience?",
        "What amenities and assistance are included in a trip fee for travelers?",
        "What benefits are included in a trip fee for travelers using the TripActions platform?",
        "Can you explain the perks of a trip fee?",
        "What do travelers get with a trip fee?",
        "What features does a trip fee offer?",
        "How does a trip fee benefit travelers?",
        "Why am I paying a trip fee?",
        "What do I get for a trip fee?"
      ],
      answer:
        "A trip fee provides access to the TripActions platform, localized, unlimited 24/7 365 live support from the TripActions Travel Experience Team, and a unified view of company-wide travel data for program administrators. For more information, please visit <a href='https://community.tripactions.com/s/article/trip-fee-overview-for-travelers'>this page</a>.",
    },
    {
      questions: [
        "How can I avoid excess trip fees?",
        "What is the best way to avoid incurring multiple trip fees?",
        "Is there a way to minimize trip fees?",
        "What steps can I take to avoid excess trip fees?",
        "How can I make sure I'm not paying extra trip fees?",
        "What is the most efficient way to avoid trip fees?",
        "What can I do to avoid multiple trip fees?",
        "Is there a way to combine multiple bookings under a single trip?",
        "How do I use the Merge Trips functionality?",
        "Where can I find the Merge Trips feature?",
        "Why do I have multiple trip fees?"
      ],
      answer:
        "To avoid excess trip fees, travelers should add all transportation and accommodation bookings required for their trip under a single trip. If multiple bookings need to be combined under a single trip, travelers can use the Merge Trips functionality in the Trips section of their account. For more information, please visit <a href='https://community.tripactions.com/s/article/trip-fee-overview-for-travelers'>this page</a>.",
    },
    {
      questions: [
        "Are trip fees refundable?",
        "What is the policy on trip fee refunds?",
        "Can I get a refund for my trip fee?",
        "If I cancel my trip, can I get a refund for the trip fee?",
        "Are trip fees refundable in any circumstances?",
        "What happens to the trip fee if I cancel my trip?",
        "Is there any way to get a refund for a trip fee?",
        "Are trip fees non-refundable?",
        "What is the policy on trip fees in the event of trip cancellation?",
        "Can I get a refund for a trip fee if I need to cancel my trip?",
        "How can I get my money back for a trip fee?"
      ],
      answer:
        "All trip fees are non-refundable fees charged for utilizing the platform and cannot be refunded even if a trip is canceled. For more information, please visit <a href='https://community.tripactions.com/s/article/trip-fee-overview-for-travelers'>this page</a>.",
    },
    {
      questions: [
        "Are guests charged a trip fee?",
        "What is the policy on trip fees for guests?",
        "Are plus ones charged a trip fee?",
        "How does the trip fee system work for guests?",
        "Are trip fees charged for guests invited through Team Travel?",
        "What is the policy on trip fees for personal bookings?",
        "Are trip fees applicable to personal bookings?",
        "What is the difference in trip fees for personal bookings and bookings for guests?",
        "Are guests charged a separate trip fee from the main invitee?",
        "What is the policy on trip fees for multiple guests?"
      ],
      answer: "Guests added to a Team Invite or plus ones added through the Invite Guest feature will be charged a separate trip fee from the main invitee, for a total of two trip fees. Trip fees are not applicable for personal bookings made on TripActions. For more information, please visit <a href='https://community.tripactions.com/s/article/trip-fee-overview-for-travelers'>this page</a>."
    },
  ];


  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('en');

  questionsAndAnswers.forEach((item, index) => {
    item.questions.forEach((question) => {
      nlp.addDocument('en', question, new String(index))
    });

    nlp.addAnswer('en', index, item.answer)
  })

  await nlp.train();

  document.getElementById("button").addEventListener("click", async () => {
    console.log('i was clicked!')
    const question = document.getElementById("question").value
    const answer = (await nlp.process('en', question))
    console.log(answer)
    document.getElementById("answer").innerHTML = answer.answer;
  })

  const input = document.querySelector('input');

input.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const question = document.getElementById("question").value
    const answer = (await nlp.process('en', question))
    console.log(answer)
    document.getElementById("answer").innerHTML = answer.answer;
  }
});
})();