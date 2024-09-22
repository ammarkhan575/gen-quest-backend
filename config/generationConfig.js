const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        response: {
          type: "object",
          properties: {
            generatedContent: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  "title ": {
                    type: "string"
                  },
                  description: {
                    type: "string"
                  }
                }
              }
            },
            topic: {
              type: "string"
            },
            quiz: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  totalQuestion: {
                    type: "integer"
                  },
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        questionId: {
                          type: "integer"
                        },
                        question: {
                          type: "string"
                        },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              option: {
                                type: "string"
                              },
                              optionId: {
                                type: "integer"
                              }
                            }
                          }
                        },
                        correctOption: {
                          type: "integer"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          required: [
            "topic"
          ]
        }
      },
      required: [
        "response"
      ]
    },
  };

  export default generationConfig;