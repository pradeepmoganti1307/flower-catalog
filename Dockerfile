FROM denoland/deno:2.2.12
EXPOSE 8000
WORKDIR /app
COPY deno* /app
RUN deno install
COPY . .
CMD ["deno", "run", "-A","main.js"]
