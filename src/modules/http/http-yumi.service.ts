import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { YUMI_BASE_URL } from '../../constants';

@Injectable()
export class HttpYumiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: YUMI_BASE_URL,
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getHttpClient(): AxiosInstance {
    return this.axiosInstance;
  }
}
