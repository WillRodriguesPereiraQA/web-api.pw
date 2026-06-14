import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export function validateJsonSchema(schema, data) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  if (!isValid) {
    const errors = validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ');
    throw new Error(`Schema validation failed: ${errors}`);
  }

  return true;
}

export function assertJsonContentType(response) {
  expect(response.headers).to.have.property('content-type');
  expect(response.headers['content-type']).to.match(/application\/json/i);
}

export function assertSuccessResponse(response, { expectedStatus = 200, maxDurationMs } = {}) {
  expect(response.status).to.eq(expectedStatus);
  assertJsonContentType(response);

  if (maxDurationMs !== undefined) {
    expect(response.duration).to.be.lessThan(maxDurationMs);
  }
}

export function assertErrorResponse(response, { allowedStatuses, minStatus = 400 } = {}) {
  if (allowedStatuses?.length) {
    expect(response.status).to.be.oneOf(allowedStatuses);
  } else {
    expect(response.status).to.be.at.least(minStatus);
  }
}

export function assertRequiredFields(object, fields) {
  fields.forEach((field) => {
    expect(object).to.have.property(field);
    expect(object[field]).to.not.be.null;
    expect(object[field]).to.not.be.undefined;
  });
}

export function assertStringFields(object, fields) {
  fields.forEach((field) => {
    expect(object[field]).to.be.a('string').and.not.empty;
  });
}
