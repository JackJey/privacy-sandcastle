# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM nginx:1.25-alpine3.17

COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/templates/default.conf.template
COPY --chown=nginx:nginx ./build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
