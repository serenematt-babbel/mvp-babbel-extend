const addToReviewButton = document.getElementById("addToReview");
const COOKIE_NAME_SESSION = '_accounts_babbel_session';

const addToReview = async () => {
  // Temporarily set Babbel domain with uk subdomain. Subdomain to be mapped based on user location.
  const BABBEL_DOMAIN = 'https://uk.babbel.cn';
  const sessionCookie = await chrome.cookies.get({ url: BABBEL_DOMAIN, name: COOKIE_NAME_SESSION });

  // Checking session cookie for MVP. To be replaced with:
  // GET https://accounts-elb.babbel.com/en/me.json
    //  if OK - user has valid session
    //  if UNAUTHORIZED - user session is invalid
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

  // Determine the locale based on user's browser language
  const signInUrl = 'https://accounts.babbel.cn/en_GB/accounts/sign_in';
  chrome.tabs.create({ url: signInUrl });
};

// When the button is clicked, call Get session API to check for user session
addToReviewButton.addEventListener("click", addToReview);
