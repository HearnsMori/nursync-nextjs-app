// Define the interface for the allowed HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Define the interface for the function's input parameters
export interface FetchParams {
  /** The data payload for POST, PUT, etc. (Can be null for GET/DELETE) */
  jsonData: object | null;
  /** The base URL of the backend (e.g., 'https://api.example.com') */
  backendURL: string;
  /** The specific API path (e.g., '/users/123') */
  apiEndPoint: string;
  /** The HTTP method to use */
  method: HttpMethod;
}

/**
 * A reusable function to interact with a backend API.
 *
 * @param {FetchParams} params - The structured parameters for the API call.
 * @returns {Promise<T>} The JSON response from the backend, where T is the expected type.
 * @throws {Error} Throws an error if the request fails or the response status is not OK.
 */
export async function fetchData<T = any>({ 
  jsonData, 
  backendURL, 
  apiEndPoint, 
  method 
}: FetchParams): Promise<T> {
  const url = `${backendURL}${apiEndPoint}`;
  const normalizedMethod = method.toUpperCase() as HttpMethod;
  const isBodyMethod = ['POST', 'PUT', 'PATCH'].includes(normalizedMethod);

  const options: RequestInit = {
    method: normalizedMethod,
    headers: {
      'Content-Type': 'application/json',
      // Add other headers like 'Authorization' here
    },
    // Conditionally include the 'body' for methods that require a payload
    ...(isBodyMethod && jsonData && { body: JSON.stringify(jsonData) }),
    // Note: Use 'omit' on type if it's strictly enforced and 'body' can't be null/undefined for GET
  };

  try {
    const response = await fetch(url, options);

    // 1. Check for non-2xx status codes (e.g., 404, 500)
    if (!response.ok) {
      // Attempt to get a meaningful error message from the response body
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // Ignore JSON parsing error if the response body is not JSON
      }
      
      throw new Error(errorMessage);
    }

    // 2. Handle 204 No Content (Successful but no body)
    if (response.status === 204) {
      return {} as T; // Return an empty object cast to the expected type
    }

    // 3. Return the parsed JSON response
    // We use a generic <T> to allow the caller to specify the expected return type
    return (await response.json()) as T;

  } catch (error) {
    console.error('API Call Error:', error);
    // Re-throw the error to be handled by the calling component/function
    throw error;
  }
}