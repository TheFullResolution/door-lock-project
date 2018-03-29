export const checkAccess = (doorID, doorsAuth, userId) =>
  doorsAuth[doorID][userId]
