const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  // we take the email string, and create an array of emails that is split by COMMA, and map over that array returning a new array that has had all the trailing and
  // leading spaces stripped by TRIM()
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    // filter out all the emails that ARE valid according to the email regex above
    .filter(email => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
