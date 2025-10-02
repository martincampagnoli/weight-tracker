import * as actions from './default.actions';
import { Entry } from 'src/app/models/Entry';

describe('Default Actions', () => {
  describe('getData', () => {
    it('should create action', () => {
      const action = actions.getData();
      
      expect(action.type).toBe('[Entry] Get Entries');
    });
  });

  describe('getDataSuccess', () => {
    it('should create action with payload', () => {
      const payload: Entry[] = [
        { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
        { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' }
      ];
      
      const action = actions.getDataSuccess({ payload });
      
      expect(action.type).toBe('[Entry] Get Entries Success');
      expect(action.payload).toEqual(payload);
    });

    it('should create action with empty payload', () => {
      const payload: Entry[] = [];
      
      const action = actions.getDataSuccess({ payload });
      
      expect(action.type).toBe('[Entry] Get Entries Success');
      expect(action.payload).toEqual([]);
    });
  });

  describe('getFailure', () => {
    it('should create action with error message', () => {
      const payload = { message: 'Failed to load data' };
      
      const action = actions.getFailure({ payload });
      
      expect(action.type).toBe('[Default] GetFailure  Error');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('createEntry', () => {
    it('should create action with entry data', () => {
      const payload = { 
        weight: 72, 
        date: '01-03-2024', 
        description: 'New entry' 
      };
      
      const action = actions.createEntry({ payload });
      
      expect(action.type).toBe('[Default] Create Entry');
      expect(action.payload).toEqual(payload);
    });

    it('should create action without description', () => {
      const payload = { 
        weight: 72, 
        date: '01-03-2024'
      };
      
      const action = actions.createEntry({ payload });
      
      expect(action.type).toBe('[Default] Create Entry');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('deleteEntry', () => {
    it('should create action with entry id', () => {
      const payload = { id: 1 };
      
      const action = actions.deleteEntry({ payload });
      
      expect(action.type).toBe('[Default] Delete Entry');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('resetAppState', () => {
    it('should create action', () => {
      const action = actions.resetAppState();
      
      expect(action.type).toBe('[Default] Reset app state');
    });
  });
});