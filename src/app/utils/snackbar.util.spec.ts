import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarUtil } from './snackbar.util';

describe('SnackBarUtil', () => {
  let service: SnackBarUtil;
  let mockMatSnackBar: Partial<jest.Mocked<MatSnackBar>>;

  beforeEach(() => {
    mockMatSnackBar = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        SnackBarUtil,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });

    service = TestBed.inject(SnackBarUtil);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be provided in root', () => {
    expect(service).toBeInstanceOf(SnackBarUtil);
  });

  describe('show method', () => {
    it('should call MatSnackBar.open with correct parameters', () => {
      const testMessage = 'Test message';
      service.show(testMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(testMessage, '', {
        duration: 2000,
      });
    });

    it('should call MatSnackBar.open exactly once', () => {
      const testMessage = 'Another test message';
      service.show(testMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
    });

    it('should handle empty string message', () => {
      const emptyMessage = '';
      service.show(emptyMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(emptyMessage, '', {
        duration: 2000,
      });
    });

    it('should handle long message strings', () => {
      const longMessage =
        'This is a very long message that might be used in a snackbar to test how the utility handles extended text content that could potentially wrap or be truncated';
      service.show(longMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(longMessage, '', {
        duration: 2000,
      });
    });

    it('should handle special characters in message', () => {
      const specialCharMessage =
        'Message with special chars: !@#$%^&*()_+-=[]{}|;\':",./<>?';
      service.show(specialCharMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(
        specialCharMessage,
        '',
        {
          duration: 2000,
        }
      );
    });

    it('should handle unicode characters in message', () => {
      const unicodeMessage = '测试消息 🎉 Тест сообщение ñáéíóú';
      service.show(unicodeMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(unicodeMessage, '', {
        duration: 2000,
      });
    });

    it('should call MatSnackBar.open multiple times for multiple calls', () => {
      const messages = ['First message', 'Second message', 'Third message'];
      messages.forEach((message) => service.show(message));
      expect(mockMatSnackBar.open).toHaveBeenCalledTimes(3);
      messages.forEach((message, index) => {
        expect(mockMatSnackBar.open).toHaveBeenNthCalledWith(
          index + 1,
          message,
          '',
          { duration: 2000 }
        );
      });
    });

    it('should always use empty action string', () => {
      const testMessage = 'Test for action parameter';
      service.show(testMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(
        expect.any(String),
        '',
        expect.any(Object)
      );
    });

    it('should always use 2000ms duration', () => {
      const testMessage = 'Test for duration';
      service.show(testMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        { duration: 2000 }
      );
    });

    it('should maintain consistent configuration across multiple calls', () => {
      const messages = ['Message 1', 'Message 2', 'Message 3'];
      messages.forEach((message) => service.show(message));
      messages.forEach((message, index) => {
        expect(mockMatSnackBar.open).toHaveBeenNthCalledWith(
          index + 1,
          message,
          '',
          { duration: 2000 }
        );
      });
    });
  });

  describe('MatSnackBar integration', () => {
    it('should use injected MatSnackBar instance', () => {
      const testMessage = 'Integration test message';
      service.show(testMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle null message gracefully', () => {
      expect(() => service.show(null as unknown as string)).not.toThrow();
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(null, '', {
        duration: 2000,
      });
    });

    it('should handle undefined message gracefully', () => {
      expect(() => service.show(undefined as unknown as string)).not.toThrow();
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(undefined, '', {
        duration: 2000,
      });
    });

    it('should propagate MatSnackBar errors', () => {
      const errorMessage = 'MatSnackBar error';
      (mockMatSnackBar.open as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });
      expect(() => service.show('test')).toThrow(errorMessage);
    });
  });

  describe('service configuration', () => {
    it('should be injectable', () => {
      expect(() => TestBed.inject(SnackBarUtil)).not.toThrow();
    });

    it('should return the same instance when injected multiple times (singleton)', () => {
      const instance1 = TestBed.inject(SnackBarUtil);
      const instance2 = TestBed.inject(SnackBarUtil);

      expect(instance1).toBe(instance2);
    });

    it('should be provided in root scope', () => {
      const instance = TestBed.inject(SnackBarUtil);
      expect(instance).toBeInstanceOf(SnackBarUtil);
    });
  });

  describe('performance and behavior tests', () => {
    it('should handle rapid successive calls', () => {
      const rapidMessages = Array.from(
        { length: 100 },
        (_, i) => `Rapid message ${i}`
      );

      rapidMessages.forEach((message) => service.show(message));

      expect(mockMatSnackBar.open).toHaveBeenCalledTimes(100);
    });

    it('should not modify the input message', () => {
      const originalMessage = 'Original message';
      const messageReference = originalMessage;
      service.show(messageReference);
      expect(messageReference).toBe(originalMessage);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(originalMessage, '', {
        duration: 2000,
      });
    });
  });

  describe('message content validation', () => {
    it.each([
      ['simple message', 'Hello World'],
      ['message with numbers', 'Entry 123 saved successfully'],
      ['message with punctuation', 'Success! Your data has been saved.'],
      ['message with newlines', 'Line 1\\nLine 2'],
      ['message with tabs', 'Column 1\\tColumn 2'],
      ['HTML-like content', '<div>Not actual HTML</div>'],
      ['JSON-like content', '{"success": true, "message": "Done"}'],
    ])('should handle %s: %s', (description, message) => {
      service.show(message);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith(message, '', {
        duration: 2000,
      });
    });
  });
});
