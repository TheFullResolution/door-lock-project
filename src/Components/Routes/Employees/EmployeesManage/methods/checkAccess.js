export const checkAccess = (doorID, doorsAuth, userId) =>
  doorsAuth  && doorsAuth[doorID] && doorsAuth[doorID][userId]
