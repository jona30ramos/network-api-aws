/* eslint-disable quotes */

export const en = {
  errors: {
    unauthorized: 'You are unauthorized for this action',
    forbidden: 'You do not have permissions to perform this action',
    emptyToken: 'You need a token to request this endpoint',
    invalidToken: 'You provide an invalid token',
    duplicateEmail: 'Username or Email are already taken',
    hashedPassword:
      'Your password cannot contain more than three times the symbol `$`',
    confirmPassword: 'Confirm password does not match',
    oldPassword: 'Old password does not match',
    missingData: 'Missing "data" payload in the request body',
    missingEntityId: 'Missing id property on entities',
    missingIds: 'Missing "ids" paylod in the request query',
    notFound: '%s with id %s not found',
    notImplemented: 'Not Implemented',
    notOwner:
      "You don't have permissions to manage %s that doesn't belong to you",
    badAnswer: 'Current answer `%s` is not allowed',
    wrongDataType: 'data property for bulk operations must be array',
    wrongIdsType: 'ids property for bulk operations must be array',
    entityWithIdNotFound: 'Entity %s with %s not found',
    entityNotFound: 'Entity %s not found',
    recordNotFound: 'Record not found',
    relatedEntities: 'Cannot delete and entity with relations',
    pool: {
      initialization: 'failed to initialized pool',
    },
  },
}
