/**
 * @jest-environment node
 */
import { expect, describe, it, jest } from '@jest/globals';
import { initializeTimes, updateTimes } from './pages/Reservations';
import { fetchAPI } from './api'; // We need to import the real API to mock it

// This line tells Jest (the testing library) that we want to create a fake version of the api.js file.
jest.mock('./api');

// Test suite for the initializeTimes function
describe('initializeTimes', () => {
    it('should return the correct initial times from the API', () => {
        // Arrange: Define the fake data our mock API should return for this test.
        const mockTimes = ['17:00', '18:00', '19:00'];
        fetchAPI.mockReturnValue(mockTimes); // Tell the fake fetchAPI to return this data.

        // Act: Call the function we are testing.
        const result = initializeTimes();

        // Assert: Check if the function returned the expected value.
        // We expect it to return an object with a 'times' property containing our mock data.
        expect(result).toEqual({ times: mockTimes });
    });
});

// Test suite for the updateTimes reducer function
describe('updateTimes', () => {
    it('should return the new times provided by the API when the date changes', () => {
        // Arrange: Set up the initial state and the action to be dispatched.
        const initialState = { times: ['17:00', '18:00'] };
        const action = {
            type: 'UPDATE_TIMES',
            payload: { date: new Date('2025-07-28') } // A specific date for the test
        };

        // Arrange: Define the fake data the API should return for the new date.
        const mockNewTimes = ['20:00', '21:00', '22:00'];
        fetchAPI.mockReturnValue(mockNewTimes); // Tell the fake fetchAPI to return this new data.

        // Act: Call the reducer function with the initial state and the action.
        const newState = updateTimes(initialState, action);

        // Assert: Check if the new state has the updated times from our mock API.
        expect(newState).toEqual({ times: mockNewTimes });
    });
});