let addToReviewButton = document.getElementById("addToReview");
const COOKIE_NAME_SESSION = '_accounts_babbel_session';

const addToReview = async () => {
  // Temporarily set Babbel domain with uk subdomain. Subdomain to be mapped based on user location.
  const BABBEL_DOMAIN = 'https://uk.babbel.com';
  const sessionCookie = await chrome.cookies.get({ url: BABBEL_DOMAIN, name: COOKIE_NAME_SESSION });
  if (sessionCookie && sessionCookie.value) {
    const newItem = document.getElementById('wordOfTheDay').textContent;
    
    // POST newItem to review, i.e., update a user's Learned Item. Learned item is a review item that belongs to a user and
    // contains learning data. In the app, after a user finishes a lesson, review items that belong to the lesson transform
    // into learned items for the user. But here, the selected word gets added to learned items without finishing a lesson.
    // https://github.com/lessonnine/learned-items.babbel/blob/master/docs/diagrams/writing_diagram.svg

    // Insert newItem to Learned Item dynamoDB
    alert(`${newItem} added to Babbel review!`);
    return;
  }
};

// When the button is clicked, call Get session API to check for user session
addToReviewButton.addEventListener("click", addToReview);
