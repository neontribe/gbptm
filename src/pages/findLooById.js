export default `
  query findLooById($id: ID) {
    loo(id: $id) {
      id
      createdAt
      updatedAt
      verifiedAt
      active
      location {
        lat
        lng
      }
      name
      openingTimes
      accessible
      male
      female
      allGender
      babyChange
      childrenOnly
      urinalOnly
      radar
      automatic
      noPayment
      paymentDetails
      notes
      removalReason
      attended
    }
  }
`;
