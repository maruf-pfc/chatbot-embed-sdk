class Client {
  constructor({
    id,
    business_name,
    business_info,
    fallback_message,
    bubble_color,
  }) {
    this.id = id;
    this.business_name = business_name;
    this.business_info = business_info;
    this.fallback_message = fallback_message;
    this.bubble_color = bubble_color;
    this.created_at = new Date().toISOString();
  }

  validate() {
    if (!this.id || !this.business_name || !this.business_info) {
      throw new Error(
        "Missing required fields: id, business_name, business_info",
      );
    }
    if (this.id.includes(" ")) {
      throw new Error("Client ID cannot contain spaces");
    }
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      business_name: this.business_name,
      business_info: this.business_info,
      fallback_message: this.fallback_message,
      bubble_color: this.bubble_color,
      created_at: this.created_at,
    };
  }
}

module.exports = Client;
