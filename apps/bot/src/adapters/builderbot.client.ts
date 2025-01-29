import axios, { AxiosInstance } from 'axios';
import { createLogger } from '../utils/logger';

const logger = createLogger('BuilderBotClient');

export interface SendMessageOptions {
  content: string;
  mediaUrl?: string;
  checkIfExists?: boolean;
}

export class BuilderBotClient {
  private client: AxiosInstance;
  private botId: string;

  constructor(apiKey: string, botId: string) {
    this.botId = botId;
    this.client = axios.create({
      baseURL: 'https://app.builderbot.cloud/api/v2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-builderbot': apiKey
      }
    });
  }

  async sendMessage(number: string, options: SendMessageOptions) {
    try {
      const response = await this.client.post(`/${this.botId}/messages`, {
        messages: {
          content: options.content,
          mediaUrl: options.mediaUrl
        },
        number,
        checkIfExists: options.checkIfExists ?? false
      });
      return response.data;
    } catch (error) {
      logger.error('Error sending message:', error);
      throw error;
    }
  }

  async addToBlacklist(number: string) {
    try {
      const response = await this.client.post(`/${this.botId}/blacklist`, {
        number,
        intent: 'add'
      });
      return response.data;
    } catch (error) {
      logger.error('Error adding to blacklist:', error);
      throw error;
    }
  }

  async removeFromBlacklist(number: string) {
    try {
      const response = await this.client.post(`/${this.botId}/blacklist`, {
        number,
        intent: 'remove'
      });
      return response.data;
    } catch (error) {
      logger.error('Error removing from blacklist:', error);
      throw error;
    }
  }

  async rebootBot() {
    try {
      const response = await this.client.get(`/${this.botId}/reboot`);
      return response.data;
    } catch (error) {
      logger.error('Error rebooting bot:', error);
      throw error;
    }
  }

  async getAttachment(filename: string) {
    try {
      const response = await this.client.get(`/${this.botId}/attachments/${filename}`);
      return response.data;
    } catch (error) {
      logger.error('Error getting attachment:', error);
      throw error;
    }
  }
}