import {
  appReducer,
  AppState,
  getAppState,
  getDataState,
  getNextEntryId,
} from './default.reducers';
import * as actions from './default.actions';
import { Entry } from 'src/app/models/Entry';

describe('App Reducer', () => {
  const initialState: AppState = {
    loading: false,
    data: [],
    nextId: 1,
  };

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
  ];

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = appReducer(undefined, { type: 'UNKNOWN_ACTION' } as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('resetAppState Action', () => {
    it('should reset state to initial state', () => {
      const currentState: AppState = {
        loading: true,
        data: mockEntries,
        nextId: 10,
      };

      const action = actions.resetAppState();
      const result = appReducer(currentState, action);

      expect(result).toEqual(currentState);
    });
  });

  describe('getDataSuccess Action', () => {
    it('should set data and update nextId based on max id', () => {
      const action = actions.getDataSuccess({ payload: mockEntries });
      const result = appReducer(initialState, action);

      expect(result.data).toEqual(mockEntries);
      expect(result.loading).toBe(false);
      expect(result.nextId).toBe(4);
    });

    it('should handle empty data array', () => {
      const action = actions.getDataSuccess({ payload: [] });
      const result = appReducer(initialState, action);

      expect(result.data).toEqual([]);
      expect(result.loading).toBe(false);
      expect(result.nextId).toBe(1);
    });

    it('should update existing state', () => {
      const currentState: AppState = {
        loading: true,
        data: [{ id: 1, weight: 75, date: '01-01-2023', description: 'Old' }],
        nextId: 5,
      };

      const newEntries = [
        { id: 10, weight: 70, date: '01-01-2024', description: 'New' },
      ];
      const action = actions.getDataSuccess({ payload: newEntries });
      const result = appReducer(currentState, action);

      expect(result.data).toEqual(newEntries);
      expect(result.nextId).toBe(11);
      expect(result.loading).toBe(false);
    });
  });

  describe('createEntry Action', () => {
    it('should add new entry with auto-generated id', () => {
      const currentState: AppState = {
        loading: false,
        data: mockEntries,
        nextId: 4,
      };

      const newEntryData = {
        weight: 72,
        date: '15-02-2024',
        description: 'New entry',
      };

      const action = actions.createEntry({ payload: newEntryData });
      const result = appReducer(currentState, action);

      expect(result.data).toHaveLength(4);
      expect(result.data[0]).toEqual({
        id: 4,
        weight: 72,
        date: '15-02-2024',
        description: 'New entry',
      });
      expect(result.nextId).toBe(5);
      expect(result.loading).toBe(false);
    });

    it('should add entry without description', () => {
      const newEntryData = {
        weight: 72,
        date: '15-02-2024',
      };

      const action = actions.createEntry({ payload: newEntryData });
      const result = appReducer(initialState, action);

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        id: 1,
        weight: 72,
        date: '15-02-2024',
        description: undefined,
      });
      expect(result.nextId).toBe(2);
    });

    it('should prepend new entry to existing data', () => {
      const currentState: AppState = {
        loading: false,
        data: [
          { id: 1, weight: 70, date: '01-01-2024', description: 'Existing' },
        ],
        nextId: 2,
      };

      const newEntryData = {
        weight: 72,
        date: '15-02-2024',
        description: 'New',
      };
      const action = actions.createEntry({ payload: newEntryData });
      const result = appReducer(currentState, action);

      expect(result.data[0].id).toBe(2);
      expect(result.data[1].id).toBe(1);
    });
  });

  describe('deleteEntry Action', () => {
    it('should remove entry by id', () => {
      const currentState: AppState = {
        loading: false,
        data: mockEntries,
        nextId: 4,
      };

      const action = actions.deleteEntry({ payload: { id: 2 } });
      const result = appReducer(currentState, action);

      expect(result.data).toHaveLength(2);
      expect(result.data.find((entry) => entry.id === 2)).toBeUndefined();
      expect(result.loading).toBe(false);
      expect(result.nextId).toBe(4);
    });

    it('should handle deletion of non-existent entry', () => {
      const currentState: AppState = {
        loading: false,
        data: mockEntries,
        nextId: 4,
      };

      const action = actions.deleteEntry({ payload: { id: 999 } });
      const result = appReducer(currentState, action);

      expect(result.data).toEqual(mockEntries);
      expect(result.data).toHaveLength(3);
    });

    it('should handle deletion from empty array', () => {
      const action = actions.deleteEntry({ payload: { id: 1 } });
      const result = appReducer(initialState, action);

      expect(result.data).toEqual([]);
      expect(result.loading).toBe(false);
    });
  });

  describe('Unknown Action', () => {
    it('should return current state for unknown actions', () => {
      const currentState: AppState = {
        loading: true,
        data: mockEntries,
        nextId: 5,
      };

      const result = appReducer(currentState, {
        type: 'UNKNOWN_ACTION',
      } as any);

      expect(result).toEqual(currentState);
    });
  });
});

describe('App Selectors', () => {
  const mockAppState: AppState = {
    loading: false,
    data: [
      { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
      { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    ],
    nextId: 3,
  };

  const mockState = {
    app: mockAppState,
  };

  describe('getAppState', () => {
    it('should return the app state', () => {
      const result = getAppState.projector(mockAppState);
      expect(result).toEqual(mockAppState);
    });
  });

  describe('getDataState', () => {
    it('should return the data from app state', () => {
      const result = getDataState.projector(mockAppState);
      expect(result).toEqual(mockAppState.data);
    });

    it('should return empty array when no data', () => {
      const emptyState: AppState = { ...mockAppState, data: [] };
      const result = getDataState.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('getNextEntryId', () => {
    it('should return the next id', () => {
      const result = getNextEntryId.projector(mockAppState);
      expect(result).toBe(3);
    });

    it('should return 1 for initial state', () => {
      const initialState: AppState = {
        loading: false,
        data: [],
        nextId: 1,
      };
      const result = getNextEntryId.projector(initialState);
      expect(result).toBe(1);
    });
  });
});
