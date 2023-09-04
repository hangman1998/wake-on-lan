use std::net::{Ipv4Addr, ToSocketAddrs, UdpSocket};

/// A Wake-on-LAN magic packet.
pub struct MagicPacket {
    magic_bytes: [u8; 102],
}

impl MagicPacket {
    /// Creates a new `MagicPacket` intended for `mac_address` (but doesn't send it yet).
    pub fn new(mac_address: &Vec<u8>) -> MagicPacket {
        let mut magic_bytes = [0u8; 102];
        // 6 bytes of FF
        for i in 0..6 {
            magic_bytes[i] = 0xFF;
        }
        // 16 times repeating the 6 bytes of mac address
        for i in 0..16 {
            magic_bytes[6 + i * 6..6 + (i + 1) * 6].copy_from_slice(&mac_address);
        }

        MagicPacket { magic_bytes }
    }

    /// Sends the magic packet via UDP to the broadcast address `255.255.255.255:9`.
    /// Lets the operating system choose the source port and network interface.
    pub fn send(&self) -> std::io::Result<()> {
        self.send_to(
            (Ipv4Addr::new(255, 255, 255, 255), 9),
            (Ipv4Addr::new(0, 0, 0, 0), 0),
        )
    }

    /// Sends the magic packet via UDP to/from an IP address and port number of your choosing.
    pub fn send_to<A: ToSocketAddrs>(&self, to_addr: A, from_addr: A) -> std::io::Result<()> {
        let socket = UdpSocket::bind(from_addr)?;
        socket.set_broadcast(true)?;
        socket.send_to(&self.magic_bytes, to_addr)?;

        Ok(())
    }
}
